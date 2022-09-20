import { Table } from "antd";
import useGetUsers from "../hooks/users/getUsers"

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
];

const Users = () => {
  const { data } = useGetUsers(null)

  return (
    <Table dataSource={data?.content} columns={columns} />
  )
}

export default Users