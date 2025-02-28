import { Component, Input } from '@angular/core';
import { SidebarItem } from '../../../models/sidebar.model';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  timedOutCloser: any;
  openPrjectSubMenu = false;
  @Input() sidebarShow: boolean | undefined;
  @Input() userRole = null;
  sidebarItems: SidebarItem[] | undefined | any;
  constructor() { }

  ngOnChanges() {
    this.getMenu();
  }

  ngOnInit() { }

  getMenu() {
    this.sidebarItems = [
      {
        type: 'link',
        name: 'Project Management',
        route: '/project-management',
        isProjectMenu: false,
        icon: 'group_service',
        iconType: 'svg',
        roles: []
      },
      {
        type: 'link',
        name: 'User Management',
        route: '/admin/users',
        icon: 'account_balance',
        iconType: 'mat-icon',
        roles: []
      },
    ];
  }

  // https://stackoverflow.com/questions/47527529/how-to-change-absolute-position-of-mat-menu-in-angular-4-material-using-x-and-y
  mouseEnter(item: any) {
    if (!item.isProjectMenu) {
      return;
    }
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    this.openPrjectSubMenu = true;
  }

  mouseLeave(item: any) {
    if (!item.isProjectMenu) {
      return;
    }
    this.timedOutCloser = setTimeout(() => {
      this.openPrjectSubMenu = false;
    }, 200);
  }

}
