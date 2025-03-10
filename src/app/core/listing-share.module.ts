// Directives
import { CustomPaginatorDirective } from './directives/custom-paginator.directive';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';

// Shared Modules
import { MatButtonModule } from '@angular/material/button';
import { CustomPaginationPipe } from './pipes/custom-pagination.pipe';
import { TooltipModule } from './tooltip.module';

// Other
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorMessComponent } from './components/form-error-mess/form-error-mess.component';

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
    MatDialogModule,
    // Shared Modules
    MatPaginatorModule,
    TooltipModule,
    FormErrorMessComponent
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
    MatFormFieldModule,
    MatInputModule,

    // Directives
    CustomPaginatorDirective,

    // Pipes
    KeysPipe,
    CustomPaginationPipe,

    // Shared
    TooltipModule,
    FormErrorMessComponent,
  ],
  providers: [DatePipe]
})
export class ListingShareModule { }
