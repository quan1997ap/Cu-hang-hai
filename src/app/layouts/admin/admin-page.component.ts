import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    SidenavComponent,
    MatButtonModule,
    MatMenuModule
  ],

  providers: [
    MatIconRegistry
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

  title = 'base-app';
  collapsed = signal(true);
  sidenavCollapsedWidth = 120;
  sidenavExpandedWidth = 250;
  sidenavWidth = computed(() => this.collapsed() ? this.sidenavCollapsedWidth + 'px' : this.sidenavExpandedWidth + 'px')

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.addSvgIcon();
  }

  addSvgIcon() {
    [
      'group_service',
      'template',
      'template',
      'user',
      'close',
      'settings',
      'plus',
      'arrow_up',
      'arrow_down',
      'clock',
      'pen',
      'delete-square',
      'trash',
      'h-menu'
    ].forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `icons/${icon}.svg`
        )
      );
    })
  }

}
