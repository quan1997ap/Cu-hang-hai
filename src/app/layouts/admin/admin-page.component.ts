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
  collapsed = signal(false);
  sidenavCollapsedWidth = '64px';
  sidenavExpandedWidth = '250px';
  sidenavWidth = computed(() => this.collapsed() ? this.sidenavCollapsedWidth : this.sidenavExpandedWidth)

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.addSvgIcon();
  }

  addSvgIcon() {
    [
      'group_service',
      'metric_rule_template',
      'alert_rule',
      'user_management',
      'close',
      'settings',
      'plus_01',
      'arrow_up',
      'arrow_down',
      'testcase',
      'clock',
      'pen',
      'delete-square'
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
