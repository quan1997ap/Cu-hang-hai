import { Routes } from '@angular/router';
import { AdminModule } from "../app/layouts/admin/admin.module";
import { AdminPageComponent } from "./layouts/admin/admin-page.component";
import { NotFoundComponent } from './layouts/errors/not-found/not-found.component';
import { AuthModule } from '../app/layouts/auth/auth.module';

export const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: 'admin',
        component: AdminPageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../app/layouts/admin/admin.module').then(m => AdminModule)
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/layouts/auth/auth.module').then(m => AuthModule)
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
]