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
import { CustomPaginatorDirective } from './directives/custom-paginator.directive';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';

// Shared Modules
import { MatButtonModule } from '@angular/material/button';
import { CustomPaginationPipe } from './pipes/custom-pagination.pipe';
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
    CustomPaginatorDirective,
    // Pipes
    KeysPipe,
    CustomPaginationPipe
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
    CustomPaginatorDirective,

    // Pipes
    KeysPipe,
    CustomPaginationPipe,

    // Shared
    TooltipModule
  ],
  providers: [DatePipe]
})
export class ListingShareModule { }
