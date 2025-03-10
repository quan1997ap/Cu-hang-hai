import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../core/models/user.model';
import { ToastService } from '../../../../../core/services/data-trans/toast.service';
import { UserService } from '../../../../../core/services/requests/user.service';
import { LoadingService } from '../../../../../core/services/requests/loading.service';
import { finalize } from 'rxjs';
import { UserRoleOptions, UserStatusOptions } from '../../../../../core/const/user.const';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss',
  standalone: false
})
export class DetailUserComponent implements OnInit {
  userForm: FormGroup;
  isShowPw = false;
  userRoleOptions = UserRoleOptions;
  userStatusOptions = UserStatusOptions;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetailUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User;
    },
    public dialog: MatDialog,
    private toastService: ToastService,
    public userService: UserService,
    public loadingService: LoadingService
  ) {
    this.userForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      full_name: [null, []],
      email: [null, [Validators.required]],
      role: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
    if (this.data.user) {
      this.userForm.patchValue(this.data.user)
    }
  }
  ngOnInit() { }

  saveUser() {
    if (this.userForm.valid) {
      this.loadingService.showLoading();
      const user = this.userForm.getRawValue();
      user.role = Number(user.role)
      user.status = Number(user.status)
      if (this.data.user) {
        this.userService.editUser(this.data.user.id, user)
          .pipe(
            finalize(() => this.loadingService.hideLoading())
          ).subscribe(
            (resUpdate) => {
              this.toastService.success({ message: 'User edited successfully' });
              this.dialogRef.close({ updated: true });
            }
          );
      } else {
        this.userService.addUser(user)
          .pipe(
            finalize(() => this.loadingService.hideLoading())
          ).subscribe(
            (resCreate) => {
              this.toastService.success({ message: 'User added successfully' });
              this.dialogRef.close({ updated: true });
            }
          );
      }
    }
  }

}
