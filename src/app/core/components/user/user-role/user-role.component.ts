import { Component, Input } from '@angular/core';
import { UserRoleOptions, UserRoles } from '../../../const/user.const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role',
  imports: [
    CommonModule
  ],
  templateUrl: './user-role.component.html'
})
export class UserRoleComponent {
  userRoleOptions = UserRoleOptions;
  @Input() role!: UserRoles;
}
