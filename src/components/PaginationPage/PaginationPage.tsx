import { Button, Form, Input, Pagination, Space, Switch, Table } from "antd";
import { FC, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { PaginationPageProps } from "./PaginationPage.props";
import type { PaginationProps } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate } from "react-router-dom";
import FormComp from "./FormComp";

const PaginationPage: FC<PaginationPageProps> = ({ data, columns, setParams, loading, params }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    console.log("LOG -> ~ handleSearch ~ dataIndex", dataIndex)
    console.log("LOG -> ~ handleSearch ~ confirm", confirm)
    console.log("LOG -> ~ handleSearch ~ selectedKeys", selectedKeys)
    confirm();
    setParams((oldValue: any) => ({
      ...oldValue,
      filters: {
        ...oldValue.filters,
        [dataIndex]: selectedKeys[0]
      }
    }))
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    setParams((oldValue: any) => ({
      ...oldValue,
      filters: {}
    }))
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string, title: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    sorter: true,
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  columns = columns.map((column: any) => ({
    ...column,
    dataIndex: column.key,
    ...getColumnSearchProps(column.key, column.title),
  }))

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>
  ) => {
    console.log("LOG -> ~ pagination", pagination)
    console.log("LOG -> ~ filters", filters)
    setParams((oldValue: any) => ({
      ...oldValue,
      sort: sorter.order,
      order: sorter.field,
      page: pagination.current ? pagination.current - 1 : 0,
      size: pagination.pageSize ? pagination.pageSize : 10,
    }))
    console.log("LOG -> ~ sorter", sorter)
    
  }

  return (
    <>
      {/* <FormComp params={params} setParams={setParams} /> */}
      <Table
        dataSource={data?.content}
        columns={columns}
        pagination={{
          current: data?.number ? data?.number + 1 : 1,
          total: data?.totalElements,
          showSizeChanger: true,
          showTotal: total => `Total ${total} items`,
        }}
        loading={loading}
        //@ts-ignore
        onChange={onTableChange}
      />
    </>
  )
}

export default PaginationPage