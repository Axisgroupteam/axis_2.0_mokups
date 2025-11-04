import axios from "axios";
import toast from "react-hot-toast";

const getAxios = (specificBaseUrl) => {
  const instance = axios.create();

  if (specificBaseUrl) {
    instance.defaults.baseURL = specificBaseUrl;
  } else {
    instance.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_API_URL;
  }

  // Request Interceptor - Add authentication token
  instance.interceptors.request.use(
    async (config) => {
      // Lazy import store to avoid circular dependency
      const { store } = await import("@/redux/store");
      const state = store.getState();
      const token = state.auth?.userDetails?.token || localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Handle token expiration
  instance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      // Check for JWT expiration
      const isTokenExpired = error?.response?.data?.msg === "jwt expired";

      if (error.response && (error.response.status === 401 || isTokenExpired)) {
        localStorage.clear();

        // Lazy import to avoid circular dependency
        const { store } = await import("@/redux/store");
        const { logOutUser } = await import("@/redux/slice/auth.slice");
        store.dispatch(logOutUser());

        toast.error("Your session has expired");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default getAxios;
