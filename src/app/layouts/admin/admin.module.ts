import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestManagementModule } from '../../layouts/admin/modules/requests/request-management.module';
import { UserProfileModule } from '../../layouts/admin/modules/user-profile/user-profile.module';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('../../layouts/admin/modules/user-profile/user-profile.module').then(m => UserProfileModule)

  },
  {
    path: 'requests',
    loadChildren: () => import('../../layouts/admin/modules/requests/request-management.module').then(m => RequestManagementModule)
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
  ]
})
export class AdminModule { }
