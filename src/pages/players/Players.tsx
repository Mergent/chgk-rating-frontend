import useGetUsers, { UsersParams } from "../../hooks/users/getUsers"
import PaginationPage from "../../components/PaginationPage/PaginationPage";
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import FormComp, { Filter } from "../../components/PaginationPage/FormComp";
import useGetRoles from "../../hooks/roles/getRoles";
import { Roles } from "../../hooks/roles/getRole";
import { useTranslation } from "react-i18next";
import useGetPlayers, { PlayersParams } from "../../hooks/players/getPlayers";

const PlayersComp = () => {
  const [params, setParams] = useState<PlayersParams>()
  const { data: playersData, isFetching: isUsersFetching } = useGetPlayers(params)
  const [t] = useTranslation();
  const navigate = useNavigate()

  const filters: Filter[] = [
    {
      type: 'checkbox',
      title: 'Is active',
      key: 'isActive',
      value: params?.isActive
    },
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
        data={playersData}
        columns={columns}
        setParams={setParams}
        loading={isUsersFetching}
        params={params}
      />
    </>
  )
}

export default PlayersComp