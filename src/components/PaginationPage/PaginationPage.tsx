import { Button, Input, Pagination, Space, Table } from "antd";
import { FC, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { PaginationPageProps } from "./PaginationPage.props";
import type { PaginationProps } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

const PaginationPage: FC<PaginationPageProps> = ({ data, columns, setParams, loading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
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

  const onPageChange: PaginationProps['onChange'] = page => {
    setParams((oldValue: any) => ({ ...oldValue, page: page - 1 }))
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_current, pageSize) => {
    setParams((oldValue: any) => ({ ...oldValue, size: pageSize }))
  };

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any>
  ) => {
    setParams((oldValue: any) => ({
      ...oldValue,
      sort: sorter.order,
      order: sorter.field
    }))
    console.log("LOG -> ~ sorter", sorter)
    
  }

  return (
    <>
      <Table
        dataSource={data?.content}
        columns={columns}
        pagination={false}
        loading={loading}
        //@ts-ignore
        onChange={onTableChange}
      />
      <Pagination
        onChange={onPageChange}
        //@ts-ignore
        current={data?.number + 1}
        total={data?.totalElements}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        showTotal={total => `Total ${total} items`}
      />
    </>
  )
}

export default PaginationPage