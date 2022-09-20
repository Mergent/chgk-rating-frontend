import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { authApi, decodeUserProfile } from "../../utils/apiUtils";
import { ID_TOKEN, Links } from "../../utils/const";
import { Config } from "../config";

export interface LoginParams {
  login: string
  password: string
  remember: boolean
}

async function fetchAuth(links: Links, auth: LoginParams) {
  const url = links.services.auth.url + links.services.auth.endpoints.token

  const authBodyForm = {
    ...auth,
    grant_type: 'password'
  }

  return authApi(authBodyForm, url);
}

export default function useLogin() {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  const navigate = useNavigate()
  return useMutation(
    (auth: LoginParams) => fetchAuth(config!.links, auth),
    {
      mutationKey: "auth",
      retry: false,
      onSuccess: (data) => {
          console.log("LOG -> ~ useLogin ~ data", data)
          if (data) {
            const idToken = data[ID_TOKEN];
            const profile: any = decodeUserProfile(idToken);
            localStorage.setItem(ID_TOKEN, idToken);
            localStorage.setItem('user_name', profile.user_name);
            queryClient.refetchQueries('currentUser')
            navigate('/');
          } else {
            localStorage.removeItem(ID_TOKEN);
          }
      }
    }
  )
}
