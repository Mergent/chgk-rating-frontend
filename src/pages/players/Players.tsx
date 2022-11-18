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
import type { ColumnsType } from 'antd/es/table';
import { Player } from "../../hooks/players/getPlayer";
import { Column } from "../../components/PaginationPage/PaginationPage.props";

const PlayersComp = () => {
  const [params, setParams] = useState<PlayersParams>()
  const { data: playersData, isFetching: isUsersFetching } = useGetPlayers(params)
  const [t] = useTranslation();
  const navigate = useNavigate()

  const mapData = {
    ...playersData,
    content: playersData?.content.map(user => ({
      ...user,
      fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`
    }))
  }

  const filters: Filter[] = [
    {
      type: 'checkbox',
      title: 'Is active',
      key: 'isActive',
      value: true
    },
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'Position',
      key: 'position',
    },
    {
      title: 'Delta',
      key: 'delta',
    },
    {
      title: 'Rating',
      key: 'rating',
    },
    {
      title: 'Per year',
      key: 'tournamentsPerYear',
    },
    {
      title: 'Total',
      key: 'totalTournaments',
    },
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'Full name',
      key: 'fullName',
      render: text => {console.log(text)}
    },
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
        data={mapData}
        columns={columns}
        setParams={setParams}
        loading={isUsersFetching}
        params={params}
      />
    </>
  )
}

export default PlayersComp