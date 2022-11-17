import { useQuery, useQueryClient } from "react-query";
import { callApi } from "../../utils/apiUtils";
import { Links } from "../../utils/const";
import { Config } from "../config";

export interface Role {
  title: Roles
  code: string
  id?: string
}

export enum Roles {
  Admin = "ADMIN",
  Orgcom = "TOURNAMENT_ORGCOM",
  Representative = "TOURNAMENT_REPRESENTATIVE",
  Leading = "TOURNAMENT_LEADING",
  Player = "TOURNAMENT_PLAYER",
}

const getRole = async (links: Links, id: string) => {
  const serviceConfig = links.services.roleservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_role.replace(/:id/i, id);
  const config = {
    method: 'get',
  }

  return callApi(url, config);
}

export default function useGetRole(id: string) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<Role, Error>(
    ["user", id],
    () => getRole(config!.links, id),
    {
      enabled: !!config && !!id,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}