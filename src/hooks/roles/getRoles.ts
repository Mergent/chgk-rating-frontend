import { useQuery, useQueryClient } from 'react-query';
import { callApi } from '../../utils/apiUtils';
import { Links } from '../../utils/const';
import { PaginationParams, PaginationResponse } from '../../utils/types';
import { getPreparedForSubmissionFilters } from '../../utils/utils';
import { Config } from '../config';
import { Role } from './getRole';

export interface RolesParams extends PaginationParams {
  isActive?: boolean
}

export const defaultParamsRoles: RolesParams = {
  page: 0,
  size: 10,
  sort: 'ascend',
  order: 'username',
};

const getRoles = async (links: Links, params: RolesParams) => {
  const serviceConfig = links.services.roleservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_roles;

  const sort = params?.sort && params?.order ? `${params?.sort},${params?.order}` : ''

  const config = {
    method: 'get',
    params: {
      page: params?.page,
      size: params?.size,
      sort,
      // search: params?.search,
      // ...getPreparedForSubmissionFilters(params?.filters)
    }
  }

  return callApi(url, config);
}

export default function useGetRoles(params: RolesParams | null) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<PaginationResponse<Role>, Error>(
    ['roles', { ...defaultParamsRoles, ...params }],
    () => getRoles(config!.links, { ...defaultParamsRoles, ...params }),

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