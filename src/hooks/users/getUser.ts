import { useQuery, useQueryClient } from "react-query";
import { callApi } from "../../utils/apiUtils";
import { Links } from "../../utils/const";
import { Config } from "../config";

export interface User {
  username: string
  firstName: string
  lastName: string
  email: string
  division: string
  roles: string[]
  id?: string
}

const getUser = async (links: Links, id: string) => {
  const serviceConfig = links.services.userservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_user.replace(/:id/i, id);
  const config = {
    method: 'get',
  }

  return callApi(url, config);
}

export default function useGetUser(id: string) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<User, Error>(
    ["user", id],
    () => getUser(config!.links, id),
    {
      enabled: !!config && !!id,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
