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


// Using for API get details, create, and others
export interface DataResponse<T> {
  status: StatusResponse;
  data: T;
}

export interface MoveSuiteResponse<T> {
  status: StatusResponse
}
