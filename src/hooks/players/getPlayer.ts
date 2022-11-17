import { useQuery, useQueryClient } from "react-query";
import { callApi } from "../../utils/apiUtils";
import { Links } from "../../utils/const";
import { Config } from "../config";

export interface Player {
  firstName: string
  lastName: string
  patronymic: string
  position: number
  delta: number
  rating: number
  totalTournaments: number
  tournamentsPerYear: number
  currentTeam: string
  towns: string[]
  currentTown: string
  registeredTournaments: any[]
  wasNarrator: boolean
  wasOrgcommitee: boolean
  wasRepresentative: boolean
  wasSertifiedReferee: boolean
  wasSertifiedEditor: boolean
  wasReferee: boolean
  link: string
  isDead: boolean
  reference: string
  id?: string
}

const getPlayer = async (links: Links, id: string) => {
  const serviceConfig = links.services.userservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_user.replace(/:id/i, id);
  const config = {
    method: 'get',
  }

  return callApi(url, config);
}

export default function useGetPlayer(id: string) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<Player, Error>(
    ["user", id],
    () => getPlayer(config!.links, id),
    {
      enabled: !!config && !!id,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
