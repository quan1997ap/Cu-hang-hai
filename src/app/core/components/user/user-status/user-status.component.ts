import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserStatuses, UserStatusOptions } from '../../../const/user.const';

@Component({
  selector: 'app-user-status',
  imports: [
    CommonModule
  ],
  templateUrl: './user-status.component.html'
})
export class UserStatusComponent {
  userStatusOptions = UserStatusOptions;
  @Input() status!: UserStatuses;
}
