import { Injectable } from '@angular/core';
import { Columns } from '../../models/table.model';

@Injectable({
    providedIn: 'root',
})
export class ListingService {

    pageSizes = [10, 15, 20]

    isStickyEndColumn(column: string, displayedColumns: Columns) {
        let allCols = Object.keys(displayedColumns);
        const stickyCols: any = [];
        allCols.forEach((col) => {
            if (displayedColumns[col].isStickyEnd === true) {
                stickyCols.push(col);
            }
        });
        return stickyCols.includes(column);
    }

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Slice the list data into the current page data.
     * @param list the list of data
     * @param option the pagination option
     * @returns the current page data
  
  /******  3302b04b-5645-4655-8f22-163757c0caf0  *******/
    paginationData(
        list: any[],
        option: { pageSize: number; pageIndex: number }
    ): any {
        return list.slice(
            option.pageSize * option.pageIndex,
            option.pageSize * (option.pageIndex + 1)
        );
    }
}
