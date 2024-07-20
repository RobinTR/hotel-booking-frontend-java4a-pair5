export interface PaginatedList<TItem> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: TItem[];
}