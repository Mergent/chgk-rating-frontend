import useGetUsers from "../hooks/users/getUsers"
import PaginationPage from "../components/PaginationPage/PaginationPage";
import { useState } from "react";

const Users = () => {
  const [params, setParams] = useState(null)
  const { data, isFetching } = useGetUsers(params)

  const columns = [
    {
      title: 'Username',
      key: 'username',
      sort: true,
    },
    {
      title: 'E-mail',
      key: 'email',
    },
    {
      title: 'First name',
      key: 'firstName',
    },
  ];

  return (
    <PaginationPage data={data} columns={columns} setParams={setParams} loading={isFetching} />
  )
}

export default Users