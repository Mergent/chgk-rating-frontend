import axios from "axios";
import { useQuery } from "react-query";
import { Links } from "../utils/const";

export interface Config {
  links: Links
}

async function getConfig() {
  const { data } = await axios.get(`${window.location.origin}/config.json`)
  return data
}

export default function useConfig() {
  return useQuery<Config>(
    'config',
    () => getConfig(), {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
