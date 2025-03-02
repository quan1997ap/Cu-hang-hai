import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestManagementModule } from '../../layouts/admin/modules/requests/request-management.module';

const adminRoutes: Routes = [
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
