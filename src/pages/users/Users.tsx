import useGetUsers, { UsersParams } from "../../hooks/users/getUsers"
import PaginationPage from "../../components/PaginationPage/PaginationPage";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import FormComp, { Filter } from "../../components/PaginationPage/FormComp";

const defaultParamsUsers: UsersParams = {
  page: 0,
  size: 10,
  sort: 'ascend',
  order: 'username',
  filters: {},
  isActive: true,
};

const Users = () => {
  const [params, setParams] = useState<UsersParams>(defaultParamsUsers)
  const { data: usersData, isFetching: isUsersFetching } = useGetUsers(params)
  const navigate = useNavigate()

  const filters: Filter[] = [
    {
      type: 'checkbox',
      title: 'Is active',
      key: 'isActive',
      value: params.isActive
    }
  ]

  const columns = [
    {
      title: 'Username',
      key: 'username',
      sort: true,
      defaultSortOrder: 'ascend',
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
    <>
      <FormComp filters={filters} setParams={setParams} />
      <PaginationPage
        data={usersData}
        columns={columns}
        setParams={setParams}
        loading={isUsersFetching}
        params={params}
      />
    </>
  )
}

export default Users