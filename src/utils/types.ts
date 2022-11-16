export interface PaginationResponse<T> {
  content: T[]
  pageable?: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  last?: boolean
  totalPages: number
  totalElements: number
  size: number
  number?: number
  sort?: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  first?: boolean
  numberOfElements?: number
  empty?: boolean
}

export interface PaginationParams {
  page: number
  size: number
  dateTo?: any
  dateFrom?: any
  sort: string
  order: string
  filters?: any
}

