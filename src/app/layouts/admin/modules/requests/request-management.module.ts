import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        ListingShareModule,
        RouterModule.forChild(router),
    ]
})
export class RequestManagementModule { }
