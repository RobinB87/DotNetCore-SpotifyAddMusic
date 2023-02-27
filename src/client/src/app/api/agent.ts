import axios, { AxiosResponse } from "axios";

import { AccessToken } from "../models/accessToken";
import { PlaylistOverview } from "../models/playlist";

axios.defaults.baseURL = "https://localhost:44381";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
  login: () => requests.get<string>("/auth/login"),
  token: (token: string) => requests.get<AccessToken>(`/auth/token/${token}`),
};

const Playlists = {
  get: (token: string) => requests.get<PlaylistOverview>(`/playlist/${token}`),
};

const agent = {
  Auth,
  Playlists,
};

export default agent;
