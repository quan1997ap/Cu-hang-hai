// https://stackoverflow.com/questions/66127028/angular-material-mattooltip-show-up-only-when-the-element-is-truncated
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matTooltipAuto]',
  standalone: false
})
export class MatTooltipAutoDirective {
  constructor(
    private el: ElementRef, private renderer: Renderer2,
    private matTooltip: MatTooltip
  ) {}

  @HostListener('mouseenter', ['$event']) onEnter(e: MouseEvent) {
    // overflow only 1 line;
    const scrollWidth = this.el.nativeElement.scrollWidth;
    const clientWidth = this.el.nativeElement.clientWidth;

    // overflow  > 1 line (when-using-webkit-line-clamp) ;  https://stackoverflow.com/questions/52089386/detect-overflow-when-using-webkit-line-clamp
    const scrollHeight = this.el.nativeElement.scrollHeight;
    const clientHeight = this.el.nativeElement.clientHeight;

    if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
      this.matTooltip.showDelay = 200;
      this.matTooltip.disabled = false;
      this.matTooltip.tooltipClass;

      if(this.matTooltip.message.length < 300) {
        this.matTooltip.tooltipClass = 'mat-tooltip sm-tooltip';
      } else if ( this.matTooltip.message.length < 400 ){
        this.matTooltip.tooltipClass = 'mat-tooltip sm-tooltip';
      } else {
        this.matTooltip.tooltipClass = 'mat-tooltip lg-tooltip';
      }

      let text = this.matTooltip.message;
      if (text.includes('\n')) {
        let newtext = '';
        let lines = text.split('\n');
        if (lines.length > 15) {
          lines = lines.slice(0, 15);
          lines.push('...');
        } else {
          lines = lines.slice(0, lines.length);
        }
        lines.forEach((line) => {
          newtext += line + '\n';
        });
        this.matTooltip.message = newtext;
      }

    } else {
      this.matTooltip.disabled = true;
    }
  }
}
