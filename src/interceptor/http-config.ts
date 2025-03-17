import axios, { AxiosInstance } from "axios";
import { _AuthApi } from "../services/auth.service";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const _axios: AxiosInstance = axios.create({
  baseURL,
});

_axios.interceptors.request.use(
  (request) => {
    request.headers["x-api-key"] = "SANN_BOOKS";

    if (request.headers) {
      request.headers["x-api-key"] = "SANN_BOOKS";
      const token = _AuthApi.getToken();

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      if (
        !(request.data instanceof FormData) &&
        !request.headers["Content-Type"]
      ) {
        request.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);

_axios.interceptors.response.use(
  function (response) {
    if (response?.config?.url?.includes("/auth/check-email")) {
      return response;
    }
    switch (response?.config?.method) {
      case "post":
      case "put":
      case "patch":
      case "delete":
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: { position: "fixed", zIndex: 100000 },
        });
        break;
      default:
        break;
    }
    return response;
  },
  function (error) {
    switch (error?.response?.status) {
      case 404:
      case 500:
      case 409:
        toast.error(
          error.response?.data?.message || "An unexpected error occurred",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        break;
      case 400:
      case 422:
        if (!error?.response?.data) {
          toast.error("An unexpected error occurred. Please try again later");
        } else if (
          error.response.data.errors &&
          typeof error.response.data.errors === "object"
        ) {
          Object.values(error.response.data.errors).forEach(
            (errorMessages: any) => {
              if (Array.isArray(errorMessages)) {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              } else {
                toast.error(`${errorMessages}`);
              }
            }
          );
        } else if (typeof error.response.data.message === "string") {
          toast.error(`${error.response.data.message}`);
        }
        break;

      case 401:
        // _AuthApi.destroyToken();
        toast.error(error.response?.data?.message || "Unauthorized", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.location.pathname = "/";
        break;
      case 403:
        toast.error(error.response?.data?.message || "Forbidden", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // window.location.pathname = "/";

        break;
      default:
        toast.error(
          error.response?.data?.message || "An unexpected error occurred",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        break;
    }
    return Promise.reject(error);
  }
);
