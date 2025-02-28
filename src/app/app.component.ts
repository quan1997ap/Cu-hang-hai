import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarState } from './models/sidebar.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    SidebarComponent,
    HttpClientModule
  ],

  providers: [
    MatIconRegistry
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public sidebar: SidebarState | any;
  title = 'base-app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.sidebar = {
      show: true,
      mode: 'side'
    };
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

  setSidebar() {

  }

  toggleSidebar() {
    this.sidebar.show = !this.sidebar.show
  }

  closeByBackdrop() {

  }

}
