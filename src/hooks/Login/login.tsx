import { useMutation, useQueryClient } from "react-query";
import { authApi } from "../../utils/apiUtils";
import { Links } from "../../utils/const";
import { Config } from "../config";

async function fetchAuth(links: Links, auth: any) {
  const url = links.services.auth.url + links.services.auth.endpoints.token

  const authBodyForm = {
    ...auth,
    grant_type: 'password'
  }

  return authApi(authBodyForm, url);
}

export default function useLogin(onSuccess: any) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useMutation(
    (auth) => fetchAuth(config!.links, auth),
    {
      mutationKey: "auth",
      retry: false,
      onSuccess
    }
  )
}
