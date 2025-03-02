import { DatePipe } from "@angular/common";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap, catchError } from "rxjs/operators";
import { ListingService } from "../../../../../core/services/data-trans/listing.service";
import { RequestService } from "../../../../../core/services/requests/request.service";
import { Columns } from "../../../../../core/models/table.model";
import { Pagination } from "../../../../../core/models/pagination.model";
import { PageDataResponse } from "../../../../../core/models/response.model";
import { ThongBaoHangHaiRequest } from "../../../../../core/models/tbhh-request.model";

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrl: './list-requests.component.scss',
  standalone: false
})
export class ListRequestsComponent implements OnInit {
  displayedColumns: Columns = {
    'index': { key: "index", columnName: "Index", width: "80px",  minWidth: "80px", maxWidth: '80px'},
    'name' : {key: 'name', columnName:'Project Name', width: '500px', minWidth: "300px",  maxWidth: '500px' } ,
    'description' : {key: 'description', columnName:'Description', minWidth: '500px',  maxWidth: 'calc(100vw - 1020px)' },
    'action' : {key: 'action', columnName:'Action', isStickyEnd: true, isCenterContent: true, width: '200px', minWidth: '200px'  }
  };
  @ViewChild('paginator') paginator!: MatPaginator;
  pageSizeOption: number[] = [];
  tbhhRequests$!: Observable<ThongBaoHangHaiRequest[]>;
  reload$!: BehaviorSubject<boolean>;
  page$!: BehaviorSubject<Pagination>;
  isLoading = false;
  searchInput: FormControl = new FormControl('');

  constructor(
    private datePipe: DatePipe,
    public listingService: ListingService,
    public requestService: RequestService,
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
    this.tbhhRequests$ = combineLatest(
      this.searchInput.valueChanges.pipe(
          startWith(this.searchInput.value),
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
        ([searchInput, page, reload]: [string, Pagination, boolean]) => {
          return this.requestService
            .getRequests({
              page: page.currentPage,
              size: page.pageSize,
              searchText: ![null, ''].includes(searchInput) ? searchInput.trim() :  ''
            })
            .pipe(
              tap((res: PageDataResponse<ThongBaoHangHaiRequest>): void => {
                if( res.pageContent.length == 0 && res.pageInfo.totalPages > 0 && this.page$.getValue().currentPage > 0 ){
                  // Fix bugs. User delete the last item of the last page.
                  const currentPage =  this.page$.getValue().currentPage - 1;
                  this.page$.next({
                    ...this.page$.getValue(),
                    currentPage: currentPage,
                    totalItem: res.pageInfo.totalElements,
                  });
                  if (this.paginator) {  this.paginator.pageIndex = currentPage;  }
                } else {
                  this.page$.next({
                    ...this.page$.getValue(),
                    totalItem: res.pageInfo.totalElements,
                  });
                }
                this.isLoading =  false;
              }),
              map((res: PageDataResponse<ThongBaoHangHaiRequest>) =>
               {
                console.log(res)
                return  res.pageContent.map((item: ThongBaoHangHaiRequest, index: number) => {
                  item.index = index + 1 + this.page$.getValue().pageSize  * this.page$.getValue().currentPage;
                  return item;
                })
               }
              ),
              catchError(() => {
                this.isLoading =  false;
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
  editProject(request?: ThongBaoHangHaiRequest){

  }

  removeProject(request: ThongBaoHangHaiRequest){
   
  }
  shareProject(request: ThongBaoHangHaiRequest){
   
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
