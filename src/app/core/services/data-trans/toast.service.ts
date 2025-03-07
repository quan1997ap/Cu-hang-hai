import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastData } from '../../models/toast.model';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    defaultConfig: {
        duration: number;
        panelClass: string;
        horizontalPosition: MatSnackBarHorizontalPosition;
        verticalPosition: MatSnackBarVerticalPosition;
    } = {
            duration: 50000,
            panelClass: 'custom-snackbar',
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        };
    constructor(private snackBar: MatSnackBar) { }

    error({ message, title, icon }: ToastData) {
        return this.snackBar.openFromComponent(ToastComponent, {
            data: {
                message: message,
                title: title || 'Error',
                className: 'error-toast',
                icon: icon || 'toast-error',
            },
            ...this.defaultConfig,
        });
    }

    success({ message, title, icon }: ToastData) {
        return this.snackBar.openFromComponent(ToastComponent, {
            data: {
                message: message,
                title: title || 'Success',
                className: 'success-toast',
                icon: icon || 'toast-success',
            },
            ...this.defaultConfig,
        });
    }

    info({ message, title, icon }: ToastData) {
        return this.snackBar.openFromComponent(ToastComponent, {
            data: {
                message: message,
                title: title || 'Information',
                className: 'info-toast',
                icon: icon || 'toast-info',
            },
            ...this.defaultConfig,
        });
    }

    warn({ message, title, icon }: ToastData) {
        return this.snackBar.openFromComponent(ToastComponent, {
            data: {
                message: message,
                title: title || 'Warning',
                className: 'warn-toast',
                icon: icon || 'toast-warning',
            },
            ...this.defaultConfig,
        });
    }
}
