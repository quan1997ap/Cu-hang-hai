import { AuthService } from './../../../../../core/services/requests/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  standalone: false
})
export class UserProfileComponent {

  constructor(
    private authService: AuthService
  ){
    this.authService.getProfile().subscribe(res => {
      console.log(res)
    })
  }
}
