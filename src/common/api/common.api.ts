import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "ba943c06-c50e-49f1-adbf-fdfeba1c5839",
  },
});
