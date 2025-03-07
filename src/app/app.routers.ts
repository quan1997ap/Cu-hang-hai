import { Routes } from '@angular/router';
import { AdminModule } from "../app/layouts/admin/admin.module";
import { AdminPageComponent } from "./layouts/admin/admin-page.component";
import { AuthModule } from '../app/layouts/auth/auth.module';
import { AuthGuard } from './core/data-access/guards/auth.guard';
import { ErrorPageComponent } from './layouts/errors/error-page/error-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminPageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../app/layouts/admin/admin.module').then(m => AdminModule)
            }
        ],
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/layouts/auth/auth.module').then(m => AuthModule)
    },
    {
        path: 'error/:id',
        component: ErrorPageComponent,
    },
    {
        path: '**',
        redirectTo: 'error/404',
    }
]