import { ToastService } from './../../../core/services/data-trans/toast.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/requests/auth.service';
import { finalize, first, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/requests/loading.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  returnUrl = '/admin';
  loginForm: FormGroup;
  isLock = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.email
        ]),
      ],
    });
    this.loginForm.patchValue({
      "email": "sysadmin@tbhh.com",
      "password": "123456"
    })
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.loadingService.showLoading();
    this.authService.login(email, password).pipe(
      first(),
      finalize(() => this.loadingService.hideLoading())
    ).subscribe(
      res => {
        this.router.navigate([this.returnUrl])
      },
      error => {
        console.log(error)
        this.toastService.error({message: 'Login không thành công'})
      }
    )
  }
}
