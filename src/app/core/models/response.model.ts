export interface StatusResponse {
  code: string;
  message: string;
  responseTime: string;
  displayMessage: string;
}

// Using for API get list of data
export interface IListResponse<T> {
  success: boolean;
  pagination: {
    count: number;
    current: number;
    pageSize: number;
    totalPages: number;
  }
  result: T[];
}
