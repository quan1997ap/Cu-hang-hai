import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const router: Routes = [
    {
        path: '',
        component: UserProfileComponent
    }
]

@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(router)
    ]
})
export class UserProfileModule { }
