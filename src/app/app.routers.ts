import { Routes } from '@angular/router';
import { AdminModule } from "../app/layouts/admin/admin.module";
import { AdminPageComponent } from "./layouts/admin/admin-page.component";
import { NotFoundComponent } from './layouts/errors/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'admin',
        component: AdminPageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../app/layouts/admin/admin.module').then(m => AdminModule)
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
]