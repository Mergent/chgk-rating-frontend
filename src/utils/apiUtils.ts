import axios from "axios";
import { ID_TOKEN } from "./const";

export const authApi = async (authData: any, url: string) => {
  if (process.env.REACT_APP_ENV === 'development') {
    // return fakeApi(url, authData);
  }

  const formData = prepareFormData(authData);

  const {data} = await axios(url, {
    method: 'post',
    data: formData,
    headers: {
      Authorization: `Basic ${btoa(`authservice:MiudWaybEbcygOad`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    }
  });

  return data;
}

export const callApi = async (url: string, config: any) => {
  if (process.env.REACT_APP_ENV === 'development') {
    // return fakeApi(url, config);
  }

  const {data} = await axios(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ID_TOKEN)}`,
    },
    ...config,
  });

  return data
}

export function prepareFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData;
}

