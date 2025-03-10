export interface ConfirmAction {
    type:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
      | 'dark'
      | 'link';
    data: any;
    label: string;
    isCloseBtn?: boolean;
  }
  
  // Refer: https://material.angular.io/components/icon/overview#theming
  export interface ConfirmConfig {
    actions?: ConfirmAction[];
    confirmTitle?: string;
    confirmMessage?: string;
    icon?: {
      name: string;
      color: 'primary' | 'accent' | 'warn';
    };
  }
  