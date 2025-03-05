import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { ListingShareModule } from '../../../../core/listing-share.module';

const router: Routes = [
    {
        path: '',
        component: ListRequestsComponent
    }
]

@NgModule({
    declarations: [
        ListRequestsComponent
    ],
    imports: [
        CommonModule,
        ListingShareModule,
        RouterModule.forChild(router)
    ]
})
export class RequestManagementModule { }
