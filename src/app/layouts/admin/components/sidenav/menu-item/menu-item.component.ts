import { MenuItem } from './../sidenav.component';
import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-menu-item',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: '../sidenav.component.scss',
  animations: [
    trigger('expandContractMenu', [
      transition(":enter", [
        style({ opacity: 0, height: '0px' }),
        animate( "500ms ease-in-out", style({ opacity: 1, height: "*" }) )
      ]),
      transition(":leave", [
        animate( "500ms ease-in-out", style({ opacity: 0, height: "0px" }) )
      ]),

    ])
  ]
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);
  nestedMenuOpen = signal(false)
  toggleNested() {
    if (!this.item().subItems) return;
    this.nestedMenuOpen.set(!this.nestedMenuOpen())
  }
}
