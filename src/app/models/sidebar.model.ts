export class SidebarItem {
    type: 'link' | 'divider' | undefined;
    id?: number;
    name?: string;
    route?: string;
    icon?: string;
    iconType?: 'svg' | 'mat-icon';
    subMenus?: SidebarItem[];
    roles?: string[];
    isProjectMenu?: boolean = false;
}

export interface SidebarState {
    show: boolean;
    mode: 'side' | 'over';
}
