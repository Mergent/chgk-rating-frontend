import { useQuery, useQueryClient } from 'react-query';
import { callApi } from '../../utils/apiUtils';
import { Links } from '../../utils/const';
import { PaginationParams, PaginationResponse } from '../../utils/types';
import { Config } from '../config';
import { User } from './getUser';

interface UsersParams extends PaginationParams {}

export const defaultParamsUsers: UsersParams = {
  page: 0,
  size: 50,
  sort: 'desc',
  order: 'date',
  filter: {},
};

const getUsers = async (links: Links, params: UsersParams) => {
  const serviceConfig = links.services.userservice;
  const url = serviceConfig.url + serviceConfig.endpoints?.get_users;

  const sort = params?.sort && params?.order ? `${params?.sort},${params?.order}` : ''

  const config = {
    method: 'get',
    params: {
      page: params?.page ?? 0,
      size: params?.size ?? 20,
      sort,
      // search: params?.search,
      // ...getPreparedForSubmissionFilters(params?.filters)
    }
  }

  return callApi(url, config);
}

export default function useGetUsers(params: UsersParams | null) {
  const queryClient = useQueryClient()
  const config = queryClient.getQueryData<Config>('config')
  return useQuery<PaginationResponse<User>, Error>(
    ['users', { ...defaultParamsUsers, ...params }],
    () => getUsers(config!.links, { ...defaultParamsUsers, ...params }),

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
