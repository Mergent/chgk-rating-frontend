import PaginationPage from "../../components/PaginationPage/PaginationPage";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import FormComp, { Filter } from "../../components/PaginationPage/FormComp";
import useGetRoles, { RolesParams } from "../../hooks/roles/getRoles";
import { useTranslation } from "react-i18next";
import { Role, Roles } from "../../hooks/roles/getRole";
import { ColumnType } from "antd/lib/table";
import { ColumnsType } from "antd/es/table";

const defaultParamsRoles: RolesParams = {
  page: 0,
  size: 10,
  sort: 'ascend',
  order: 'username',
};

const RolesComp = () => {
  const [params, setParams] = useState<RolesParams>(defaultParamsRoles)
  const { data: rolesData, isFetching: isRolesFetching } = useGetRoles(params)
  const {t} = useTranslation();
  const navigate = useNavigate()

  const roles = {
    [Roles.Admin]: t("roles.title.admin"),
    [Roles.Orgcom]: t("roles.title.orgcom"),
    [Roles.Representative]: t("roles.title.representative"),
    [Roles.Leading]: t("roles.title.leading"),
    [Roles.Player]: t("roles.title.player")
  }

  const data = {
    ...rolesData,
    content: rolesData?.content.map(role => ({ ...role, title: roles[role.title]}))
  }

  const filters: Filter[] = [
    {
      type: 'checkbox',
      title: 'Is active',
      key: 'isActive',
      value: params.isActive
    }
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      key: 'title',
      // sort: true,
      defaultSortOrder: 'ascend',
    }
  ];

  return (
    <>
      <FormComp filters={filters} setParams={setParams} />
      <PaginationPage
        data={data}
        columns={columns}
        setParams={setParams}
        loading={isRolesFetching}
        params={params}
      />
    </>
  )
}

export default RolesComp