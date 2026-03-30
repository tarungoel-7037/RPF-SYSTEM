import axios from "axios";
import { ROUTES } from "../constants/RoutesConst";
import { ROLE, TOKEN, USER } from "../constants/AppConst";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const clearAuthAndRedirect = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
  localStorage.removeItem(ROLE);
  window.location.href = ROUTES.LOGIN;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response?.data?.response === "error" &&
      response?.data?.errors === "Authorization failled"
    ) {
      clearAuthAndRedirect();
      return;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthAndRedirect();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
