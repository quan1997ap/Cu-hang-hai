import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "./menu-item/menu-item.component";

export type MenuItem = {
  icon: string;
  label: string;
  router?: string;
  subItems?: MenuItem[]
}
@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatListModule,
    MenuItemComponent
],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Home',
      router: '/admin'
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      router: '/admin/requests'
    },
    {
      icon: 'video_library',
      label: 'Admin',
      subItems: [
        {
          icon: 'play_circle',
          label: 'Video',
          router: '/admin/video/play_circle'
        }
      ]
    }
  ])
  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');


}
