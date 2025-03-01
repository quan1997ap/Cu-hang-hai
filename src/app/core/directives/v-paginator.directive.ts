/* Combine:
    Custom mat-pagination:  https://stackoverflow.com/questions/53646259/how-to-customize-mat-paginator-in-angular-material
    Build pagination: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
*/
import {
  AfterViewInit,
  Directive,
  DoCheck,
  Host,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[vPaginator]',
  standalone: false
})
export class VPaginatorDirective implements AfterViewInit, DoCheck {
  public currentPage = 1;
  public directiveLoaded = false;
  public pageGapTxt = '...';
  public addPerPageSubLabel = false;
  public paginations: Array<number | string> | undefined = [];

  // limit render page times for ngDoCheck() run initPageRange()
  public pagingContainerBtns: any;
  oldPage = {
    length: 0,
    pageSize: 0,
    pageIndex: 0
  }
  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private readonly vr: ViewContainerRef,
    private readonly ren: Renderer2
  ) {
    this.matPag._intl.itemsPerPageLabel = 'Items per page:';
  }

  /**
   *
   * https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
    totalCount: represents the total count of data available from the source.
    currentPage: represents the current active page. We'll use a 1-based index instead of a traditional 0-based index for our currentPage value.
    pageSize: represents the maximum data that is visible in a single page.
    onPageChange: callback function invoked with the updated page value when the page is changed.
    siblingCount (optional): represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
   */
  paginationRange(
    totalCount: number,
    pageSize: number,
    siblingCount = 1,
    currentPage: number
  ) {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
    // Nomaly, only show 1 page after current Page.
    // To setting more than page after current page
    const afterCurrentPageCount = 1;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return this.range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2 - afterCurrentPageCount; // ( 2 = pageGapTxt + lastpage) + number page show after current page )

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 1: No left dots to show, No right dots to show
    */
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount + afterCurrentPageCount;
      let leftRange = this.range(1, leftItemCount);
      return [...leftRange, totalPageCount];
    }


    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount + afterCurrentPageCount;
      let leftRange = this.range(1, leftItemCount);
      return [...leftRange, this.pageGapTxt, totalPageCount];
    }
    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = this.range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, this.pageGapTxt, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = this.range(leftSiblingIndex, rightSiblingIndex + 1 + afterCurrentPageCount);
      return [
        firstPageIndex,
        this.pageGapTxt,
        ...middleRange,
        this.pageGapTxt,
        lastPageIndex,
      ];
    }

    return;
  }

  range = (start: number, end: number) => {
    let length = end - start + 1;
    /*
      Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

  private buildPageNumbers(pageRangeElement: any) {
    if (this.paginations && this.paginations.length) {
      this.paginations.forEach((page) => {
        if (page === this.pageGapTxt) {
          this.ren.insertBefore(
            pageRangeElement,
            this.createPage(this.pageGapTxt, this.matPag.pageIndex),
            null
          );
        } else {
          this.ren.insertBefore(
            pageRangeElement,
            this.createPage(Number(page) - 1, this.matPag.pageIndex),
            null
          );
        }
      });
    }
  }

  private createPage(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement('mat-button');
    this.ren.addClass(linkBtn, 'mat-icon-button');

    const pagingTxt = isNaN(i) ? this.pageGapTxt : +(i + 1);
    const text = this.ren.createText(pagingTxt + '');
    this.ren.addClass(linkBtn, 'mat-custom-page');

    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        this.ren.addClass(linkBtn, 'current-page');
        break;
      case this.pageGapTxt:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        break;
      default:
        this.ren.listen(linkBtn, 'click', () => {
          this.currentPage = i;
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    return linkBtn;
  }

  private initPageRange(): void {
    if (
      this.oldPage.length === this.matPag.length &&
      this.oldPage.pageSize === this.matPag.pageSize &&
      this.oldPage.pageIndex === this.matPag.pageIndex &&
      this.pagingContainerBtns != null
    ) {
      return;
    }
    this.oldPage = {
      length: this.matPag.length,
      pageSize: this.matPag.pageSize,
      pageIndex: this.matPag.pageIndex
    }


    const pagingContainerMain = this.vr.element.nativeElement.querySelector(
      '.mat-paginator-range-actions'
    );

    const pageItemsPerPage = this.vr.element.nativeElement.querySelector('div.mat-form-field-flex');
    this.ren.addClass(pageItemsPerPage, 'mat-paginator-per-page-button');


    if (
      this.vr.element.nativeElement.querySelector(
        'div.mat-paginator-range-actions div.btn_custom-paging-container'
      )
    ) {
      this.ren.removeChild(
        pagingContainerMain,
        this.vr.element.nativeElement.querySelector(
          'div.mat-paginator-range-actions div.btn_custom-paging-container'
        )
      );
    }

    this.pagingContainerBtns = this.ren.createElement('div');
    const refNode =
      this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[2]
        .childNodes[5];
    this.ren.addClass(this.pagingContainerBtns, 'btn_custom-paging-container');
    this.ren.insertBefore(pagingContainerMain, this.pagingContainerBtns, refNode);

    const pageRange = this.vr.element.nativeElement.querySelector(
      'div.mat-paginator-range-actions div.btn_custom-paging-container'
    );
    pageRange.innerHtml = '';

    this.paginations = this.paginationRange(
      this.matPag.length,
      this.matPag.pageSize,
      1,
      this.matPag.pageIndex // current page
    );
    this.buildPageNumbers(pageRange);
  }

  private switchPage(i: number): void {
    this.matPag.pageIndex = i;
    this.matPag._changePageSize(this.matPag.pageSize);
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.directiveLoaded = true;
    }, 500);
  }

  public ngDoCheck() {
    if (this.directiveLoaded) {
      this.initPageRange();
    }
  }
}
