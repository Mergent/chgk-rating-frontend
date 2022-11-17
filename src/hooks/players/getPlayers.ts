import { useQuery, useQueryClient } from 'react-query';
import { callApi } from '../../utils/apiUtils';
import { Links } from '../../utils/const';
import { PaginationParams, PaginationResponse } from '../../utils/types';
import { getPreparedForSubmissionFilters } from '../../utils/utils';
import { Config } from '../config';
import { Role } from '../roles/getRole';
import { Player } from './getPlayer';

export interface PlayersParams extends PaginationParams {
  wasNarrator?: boolean
  wasOrgcommitee?: boolean
  wasRepresentative?: boolean
  wasSertifiedReferee?: boolean
  wasSertifiedEditor?: boolean
  wasReferee?: boolean
  link?: string
  isDead?: boolean
}

export const defaultParamsPlayers: PlayersParams = {
  page: 0,
  size: 10,
  sort: 'ascend',
  order: 'username',
  filters: {},
};

const getPlayers = async (links: Links, params: PlayersParams) => {
  const serviceConfig = links.services.playerservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_players;

  const sort = params?.sort && params?.order ? `${params?.sort},${params?.order}` : ''

  const config = {
    method: 'get',
    params: {
      page: params?.page,
      size: params?.size,
      sort,
      // search: params?.search,
      ...getPreparedForSubmissionFilters(params?.filters)
    }
  }

  return callApi(url, config);
}

export default function useGetPlayers(params: PlayersParams | undefined) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<PaginationResponse<Player>, Error>(
    ['players', { ...defaultParamsPlayers, ...params }],
    () => getPlayers(config!.links, { ...defaultParamsPlayers, ...params }),

    {
      enabled: !!config,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retryOnMount: false,
      keepPreviousData: true,
    }
  )
}
