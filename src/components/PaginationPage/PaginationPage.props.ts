import { PaginationResponse } from "../../utils/types"
import type { ColumnsType } from 'antd/es/table';

export interface PaginationPageProps {
  data: any
  columns: ColumnsType<DataType>
  setParams: any
  loading: boolean
  params: any
}

interface DataType {
  sort: string,
  title: string
}

export interface Column extends ColumnsType<any> {
  sort: any
}