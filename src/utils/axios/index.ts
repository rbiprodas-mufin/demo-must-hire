import Axios from "axios";
import { getSession } from "next-auth/react"; // client side
import { authSession } from "~/lib/auth"; // wrapper for getServerSession
import { siteConfig } from "~/config/site";
import { publicEndpoints } from "~/constants";
import { ApiError } from "~/utils/api-utils";

// Create an Axios instance
const apiClient = Axios.create({
  baseURL: siteConfig.apiBaseUrl,
  timeout: 10000,
});

// Helper: get access token depending on environment
const getAccessToken = async () => {
  if (typeof window === "undefined") {
    // server-side
    const session = await authSession();
    return session?.user?.accessToken;
  } else {
    // client-side
    const session = await getSession();
    return session?.user?.accessToken;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    if (
      config.url &&
      !publicEndpoints.some((endpoint) => config.url?.includes(endpoint))
    ) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const { data, status } = error.response || {};
    const message = data?.message || error.message || "Something went wrong";
    const code = data?.status_code || status || error.code || 500;

    if (status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return Promise.reject(new ApiError(message, code));
  }
);

export default apiClient;
