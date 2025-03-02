import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'vPagination',
  standalone: false
})
export class CustomPaginationPipe implements PipeTransform {
  // pageIndex : start form 0
  transform(
    list: any[],
    option: {
      pageSize: number;
      pageIndex: number;
      search: {
        searchBy: string[]; // field
        text: string;
        itemAs: 'Object' | 'FormControl';
        setTotalItems: (totalItem: number) => void;
      };
    }
  ): any {
    let res;
    // filter
    if (option && option.search && option.search.text && option.search.text !== '') {
      res = list.filter((item) => {
        if (option.search.itemAs === 'FormControl') {
          const itemVal = item.value;
          return option.search.searchBy
            .map((key) => itemVal[key])
            .some((value) => {
              return value.toLowerCase().includes(option.search.text.toLowerCase());
            });
        } else if (option.search.itemAs === 'Object') {
          return option.search.searchBy.map(
            (key) => item[key]).some((value) => value && value !== '' && value.toLowerCase().includes(option.search.text.toLowerCase())
            );
        }
        return;
      });
    } else {
      res = list;
    }
    if (option.search && option.search.setTotalItems) {
      option.search.setTotalItems(res.length);
    }
    // pagination
    res = res.slice(option.pageSize * option.pageIndex, option.pageSize * (option.pageIndex + 1));
    return res;
  }
}
