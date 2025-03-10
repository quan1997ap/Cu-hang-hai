// https://stackoverflow.com/questions/41684114/easy-way-to-make-a-confirmation-dialog-in-angular

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmAction, ConfirmConfig } from '../../models/confirmation.model';
@Component({
  selector: 'app-confirmation',
  imports: [
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  public confirmTitle!: string;
  public confirmMessage!: string; // strong / html
  actions: ConfirmAction[] = [
    { type: 'primary', label: 'Confirm', data: { accept: true } },
    {
      type: 'light',
      label: 'Cancel',
      data: { decline: true },
      isCloseBtn: true,
    },
  ]; // default action is confirm dialog
  confirmIcon!: { name: string; color: string };

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmConfig
  ) {
    if (data.actions) {
      this.actions = data.actions;
    }
    if (data.confirmMessage) {
      this.confirmMessage = data.confirmMessage;
    }
    if (data.confirmTitle) {
      this.confirmTitle = data.confirmTitle;
    }
    if (data.icon) {
      this.confirmIcon = data.icon;
    }
  }

  ngOnInit() { }

  confirm(data: any) {
    this.dialogRef.close(data);
  }
}
