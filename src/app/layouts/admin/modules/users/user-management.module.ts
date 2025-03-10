import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListingShareModule } from '../../../../core/listing-share.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserRoleComponent } from '../../../../core/components/user/user-role/user-role.component';
import { UserStatusComponent } from '../../../../core/components/user/user-status/user-status.component';

const router: Routes = [
    {
        path: '',
        component: ListUsersComponent
    }
]

@NgModule({
    declarations: [
        ListUsersComponent,
        DetailUserComponent,
    ],
    imports: [
        CommonModule,
        ListingShareModule,
        MatRadioModule,
        UserRoleComponent,
        UserStatusComponent,
        RouterModule.forChild(router)
    ]
})
export class UserManagementModule { }
