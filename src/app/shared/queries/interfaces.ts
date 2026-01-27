export interface Pagination {
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: null | number;
  previousPage: null | number;
}

export interface PaginatedResult<T> {
  docs: T[];
  pagination: Pagination;
}

export interface QueryOptions {
  filters: Record<string, any>;
  limit: number;
  offset: number;
  sort: { [key: string]: 'asc' | 'desc' | 1 | -1 };
}
