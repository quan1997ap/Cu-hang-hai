import { DatePipe } from "@angular/common";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap, catchError } from "rxjs/operators";
import { ListingService } from "../../../../../core/services/data-trans/listing.service";
import { Columns } from "../../../../../core/models/table.model";
import { Pagination } from "../../../../../core/models/pagination.model";
import { UserService } from "../../../../../core/services/requests/user.service";
import { DetailUserComponent } from "../detail-user/detail-user.component";
import { MatDialog } from "@angular/material/dialog";
import { DIALOG_CONFIG } from "../../../../../core/const/common.constant";
import { User } from "../../../../../core/models/user.model";
import { ConfirmConfig } from "../../../../../core/models/confirmation.model";
import { ConfirmationComponent } from "../../../../../core/components/confirmation/confirmation.component";
import { ToastService } from "../../../../../core/services/data-trans/toast.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  standalone: false
})
export class ListUsersComponent implements OnInit {
  displayedColumns: Columns = {
    'index': { key: "index", columnName: "Index", width: "80px",  minWidth: "80px", maxWidth: '80px'},
    'username' : {key: 'username', columnName:'Username', width: '200px', minWidth: "200px",  maxWidth: '00px' },
    'email' : {key: 'email', columnName:'Email', width: '200px', minWidth: "200px",  maxWidth: '200px' },
    'full_name' : {key: 'full_name', columnName:'Fullname', width: '200px', minWidth: "200px",  maxWidth: '200px' },
    'role' : {key: 'role', columnName:'Role', width: '100px', minWidth: "100px",  maxWidth: '100px' },
    'status' : {key: 'status', columnName:'Status', width: '100px', minWidth: "100px",  maxWidth: '100px' },
    'action' : {key: 'action', columnName:'Action', isStickyEnd: true, isCenterContent: true, width: '200px', minWidth: '200px'  }
  };
  @ViewChild('paginator') paginator!: MatPaginator;
  pageSizeOption: number[] = [];
  users$!: Observable<User[]>;
  reload$!: BehaviorSubject<boolean>;
  page$!: BehaviorSubject<Pagination>;
  isLoading = false;
  filterForm = new FormGroup(
    {
      searchText: new FormControl('')
    }
  )

  constructor(
    private datePipe: DatePipe,
    public listingService: ListingService,
    public userService: UserService,
    public dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.pageSizeOption = this.listingService.pageSizes;
  }

  ngOnInit(): void {
    window.scroll({  top: 0,  left: 0,  behavior: 'smooth'});
    this.setUpStreams();
    this.reload$.next(true);
  }


  setUpStreams() {
    this.isLoading = true;
    this.page$ = new BehaviorSubject<Pagination>({
      currentPage: 0,
      pageSize: this.pageSizeOption[0],
      totalItem: 0,
    });
    this.reload$ = new BehaviorSubject<boolean>(true);
    // When search form changed or pagination config change => Call API
    this.users$ = combineLatest(
      this.filterForm.controls['searchText'].valueChanges.pipe(
          startWith(this.filterForm.controls['searchText'].value),
          debounceTime(500),
          tap(() => {
              // reset page index when search
              this.page$.next({
                ...this.page$.getValue(),
                currentPage: 0,
              });
              if( this.paginator ){ this.paginator.pageIndex = 0; }
          }),
          distinctUntilChanged()
      ),
      this.page$.pipe(
        distinctUntilChanged(
          (a: Pagination, b: Pagination) =>  (a.currentPage === b.currentPage && a.pageSize === b.pageSize)
        )
      ),
      this.reload$
    ).pipe(
      tap(() => {  this.isLoading = true; }),
      // switch to another observable
      switchMap(
        ([searchInput, page, reload]: [string|null, Pagination, boolean]) => {
          return this.userService
            .getUsers({
              page: page.currentPage + 1, // Page start form 1
              limit: page.pageSize,
              searchText: ![null, ''].includes(searchInput) ? searchInput?.trim() :  '',
              status: 0
            })
            .pipe(
              tap((res ) => {
                console.log(res)
                if( res.result?.length == 0 && res.pagination.totalPages > 0 && this.page$.getValue().currentPage > 0 ){
                  // Fix bugs. User delete the last item of the last page.
                  const currentPage =  this.page$.getValue().currentPage - 1;
                  this.page$.next({
                    ...this.page$.getValue(),
                    currentPage: currentPage,
                    totalItem: res.pagination.totalPages,
                  });
                  if (this.paginator) {  this.paginator.pageIndex = currentPage;  }
                } else {
                  this.page$.next({
                    ...this.page$.getValue(),
                    totalItem: res.pagination.totalPages,
                  });
                }
                this.isLoading =  false;
              }),
              map((res) =>
               {
                console.log(res)
                return  res.result.map((item: User, index: number) => {
                  item.index = index + 1 + this.page$.getValue().pageSize  * this.page$.getValue().currentPage;
                  return item;
                })
               }
              ),
              catchError((error) => {
                this.isLoading =  false;
                console.log(error)
                return of([]);
              })
            );
        }
      )
    );

  }

  /**
    Add or Edit project
   */
  editUser(user?: User){
    let dialogEditRef = this.dialog.open(DetailUserComponent, {
      disableClose: true,
      autoFocus: false,
      width: DIALOG_CONFIG.SIZE.SMALL,
      minWidth: DIALOG_CONFIG.SIZE.SMALL,
      data: {
        user
      },
    });
    dialogEditRef.afterClosed().subscribe((result: { updated: boolean }) => {
      if ( result &&  result.updated) {
        this.reload$.next(true);
      }
    });
  }

  removeUser(user: User) {
    const confirmConfig: ConfirmConfig = {
      confirmTitle: 'Delete User',
      confirmMessage: `<div>Are you sure to remove ${user.name} ?</div>`,
      actions: [
        { type: 'light', label: 'Cancel', data: { decline: true }, isCloseBtn: true },
        { type: 'danger', label: 'Confirm', data: { accept: true } },
      ],
      icon: { name: 'warning', color: 'accent' },
    };
    const dialogRemoveRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      autoFocus: false,
      data: confirmConfig,
    });
    dialogRemoveRef.afterClosed().subscribe((confirm) => {
      if (confirm.accept) {
        this.userService.removeUser(user.id).subscribe(
          (resUpdate) => {
            this.toastService.success({ message: 'User deleted successfully' });
            this.reload$.next(true);
          },
          (error) => {}
        );
      }
    });
  }

  pageChangeEvent($event: any) {
    // Reset PageIndex when Item per page changed
    if( this.paginator && this.page$.getValue().pageSize !== $event.pageSize){
      this.paginator.pageIndex = 0;
      this.page$.next({
        ...this.page$.getValue(),
        pageSize: $event.pageSize,
        currentPage: 0,
      });

    } else {
      this.page$.next({
        ...this.page$.getValue(),
        pageSize: $event.pageSize,
        currentPage: $event.pageIndex,
      });
    }
  }

}
