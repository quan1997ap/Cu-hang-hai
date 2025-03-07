import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [
    MatIconModule,
    CommonModule
  ],
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: {
      message: string;
      title: string;
      className: string;
      icon: string;
    },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  close() {
    this.snackBar.dismiss();
  }
}
