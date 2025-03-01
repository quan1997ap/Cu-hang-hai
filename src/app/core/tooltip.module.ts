import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipAutoDirective } from './directives/matTooltip-auto.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        MatTooltipAutoDirective
    ],
    imports: [
        MatTooltipModule,
    ],
    exports: [
        CommonModule,
        MatTooltipModule,
        MatTooltipAutoDirective
    ],
})
export class TooltipModule { }
