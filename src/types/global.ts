export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
  [key: string]: unknown
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}
