import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule
  ],

  providers: [
    MatIconRegistry
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'base-app';
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
      'remove',
      'trash',
      'delete-square',
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
