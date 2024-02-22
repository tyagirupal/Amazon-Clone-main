import axios from "axios";

export const PrivateAxios = axios.create({ baseURL: "http://localhost:3000" });

export const setPrivateAccessToken = (token: string) => {
  PrivateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
