import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
// Directives

// Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { VPaginatorDirective } from './directives/v-paginator.directive';

// Shared Modules
import { MatButtonModule } from '@angular/material/button';
import { vPaginationPipe } from './pipes/v-pagination.pipe';
import { TooltipModule } from './tooltip.module';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    // Shared Modules
    MatPaginatorModule,
    TooltipModule
  ],
  declarations: [
    // Directives
    VPaginatorDirective,
    // Pipes
    KeysPipe,
    vPaginationPipe
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,

    // Directives
    VPaginatorDirective,

    // Pipes
    KeysPipe,
    vPaginationPipe,

    // Shared
    TooltipModule
  ],
  providers: [DatePipe]
})
export class ListingShareModule { }
