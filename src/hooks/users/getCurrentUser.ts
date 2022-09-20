import { useQuery, useQueryClient } from "react-query";
import { callApi } from "../../utils/apiUtils";
import { Links } from "../../utils/const";
import { Config } from "../config";
import { User } from "./getUser";

const getCurrentUser = async (links: Links) => {
  const serviceConfig = links.services.userservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_current_user;
  const config = {
    method: 'get',
  }

  return callApi(url, config);
}

export default function useGetCurrentUser() {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<User, Error>(
    "currentUser",
    () => getCurrentUser(config!.links),
    {
      enabled: !!config,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
