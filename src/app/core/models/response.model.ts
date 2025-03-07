export interface StatusResponse {
  code: string;
  message: string;
  responseTime: string;
  displayMessage: string;
}

export interface PageInfoResponse {
  totalPages: number;
  totalElements: number;
}

// Using for API get list of data
export interface ListDataResponse<T> {
  status: StatusResponse;
  data: PageDataResponse<T>;
}
export interface PageDataResponse<T> {
  pageInfo: PageInfoResponse;
  pageContent: T[];
}
