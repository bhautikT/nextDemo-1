import axios, { AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";

const AxiosDefaultSetting = async ({
  method = "GET",
  data,
  url,
  contentType,
  customHeaders = {},
  responseType = "json",
  token, // Token parameter
}: {
  method?: string;
  data?: any;
  url?: string;
  contentType?: string;
  customHeaders?: Record<string, string>;
  responseType?: any;
  token?: string; // Optional token parameter
}): Promise<any> => {
  const AxiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 10000,
    headers: {
      "Content-Type": contentType || "application/json",
      Accept: "application/json",
      ...customHeaders,
    },
    responseType,
  });

  AxiosDefault.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          config.headers["Authorization"] = `Bearer ${storedToken}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  AxiosDefault.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userSession");
        localStorage.clear();

        signOut({ callbackUrl: "/auth/loginPage" });

        window.location.href = "/auth/loginPage";
      }
      return Promise.reject(error);
    }
  );

  return AxiosDefault({
    method,
    data,
    url,
    contentType,
  } as AxiosRequestConfig);
};

export default AxiosDefaultSetting;
