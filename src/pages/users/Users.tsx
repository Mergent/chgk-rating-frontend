import useGetUsers, { UsersParams } from "../../hooks/users/getUsers"
import PaginationPage from "../../components/PaginationPage/PaginationPage";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import FormComp, { Filter } from "../../components/PaginationPage/FormComp";
import useGetRoles from "../../hooks/roles/getRoles";
import { Roles } from "../../hooks/roles/getRole";
import { useTranslation } from "react-i18next";
import { Column } from "../../components/PaginationPage/PaginationPage.props";
import { ColumnsType } from "antd/lib/table";

const defaultParamsUsers: UsersParams = {
  page: 0,
  size: 10,
  sort: 'ascend',
  order: 'username',
  filters: {},
  isActive: true,
  roles: null,
};

const Users = () => {
  const [params, setParams] = useState<UsersParams>(defaultParamsUsers)
  const { data: usersData, isFetching: isUsersFetching } = useGetUsers(params)
  const { data: rolesData } = useGetRoles(null)
  const [t] = useTranslation();
  console.log("LOG -> Users -> rolesData", rolesData)
  const navigate = useNavigate()

  const roles = {
    [Roles.Admin]: t("roles.title.admin"),
    [Roles.Orgcom]: t("roles.title.orgcom"),
    [Roles.Representative]: t("roles.title.representative"),
    [Roles.Leading]: t("roles.title.leading"),
    [Roles.Player]: t("roles.title.player")
  }

  const filters: Filter[] = [
    {
      type: 'checkbox',
      title: 'Is active',
      key: 'isActive',
      value: params.isActive
    },
    {
      type: 'select',
      title: 'Roles',
      key: 'roles',
      value: params.roles,
      options: rolesData?.content.map(role => ({ value: role.title, label: roles[role.title] }))
    }
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'Username',
      key: 'username',
      // sort: true,
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