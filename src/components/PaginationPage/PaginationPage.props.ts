import { PaginationResponse } from "../../utils/types"

export interface PaginationPageProps {
  data: PaginationResponse<any> | undefined
  columns: Column[]
  setParams: any
  loading: boolean
  params: any
}

interface Column {
  title: string
  key: string
}