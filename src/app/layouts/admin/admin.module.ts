import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RequestManagementModule } from '../../layouts/admin/modules/requests/request-management.module';
import { ReactiveFormsModule } from '@angular/forms';

const adminRoutes: Routes = [
  {
    path: 'requests',
    loadChildren: () => import('../../layouts/admin/modules/requests/request-management.module').then(m => RequestManagementModule)
  },
]


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
