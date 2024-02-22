import axios from "axios";

export const PublicAxios = axios.create({ baseURL: "http://localhost:3000" });
