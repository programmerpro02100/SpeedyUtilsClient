import axios, { AxiosRequestConfig } from 'axios';

const secret:string = process.env.secret!
const BASE_URL = process.env.serverURL

export function ApiFetch(url: string, options: RequestInit = {}) {
  return fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      secret: secret,
      ...(options.headers || {}), // Merge existing headers
    },
  });
}

export function ApiAxios(url: string, config: AxiosRequestConfig = {}) {
  return axios({
    url: `${BASE_URL}${url}`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      secret: secret,
      ...(config.headers || {}),
    },
    ...config,
  });
}
