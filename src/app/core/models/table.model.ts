export interface Columns {
    [id: string]: Column;
  }
  
  export interface Column {
    key: string;
    columnName: string;
    toolTip?: string;
    sort?: 'DESC' | 'ASC';
    sortable?: boolean;
    isStickyEnd?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    isCenterContent?: boolean;
    hide?: boolean; // show / hide
    isRequired?: boolean;
    paddingLeft?: string;
  }
  