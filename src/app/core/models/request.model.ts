export interface ListDataRequest {
  page: number;
  limit: number;
  status?: number;
  searchText?: string;
}