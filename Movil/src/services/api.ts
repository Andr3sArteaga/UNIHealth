import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from "expo-constants";

// Get API URL with proper fallbacks for different environments
const getApiUrl = (): string => {
  const extra = Constants.expoConfig?.extra;
  
  // Use the apiUrl from app.json configuration  
  return extra?.apiUrl || "http://192.168.0.2:8001";
};

// Create axios instance with proper configuration
export const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging in development
api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log("📤 Request Data:", JSON.stringify(config.data, null, 2));
      }
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("❌ API Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error("❌ API Response Error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        responseData: error.response?.data,
      });
    }

    // Handle common HTTP errors
    if (error.response?.status === 401) {
      // Token expired or invalid - could trigger logout
      console.warn("Unauthorized access - token may be expired");
    } else if (error.response && error.response.status >= 500) {
      console.error("Server error occurred");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }

    return Promise.reject(error);
  }
);

// Type-safe auth token management
export function setAuthToken(token?: string): void {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (__DEV__) {
      console.log("🔑 Auth token set");
    }
  } else {
    delete api.defaults.headers.common.Authorization;
    if (__DEV__) {
      console.log("🔓 Auth token cleared");
    }
  }
}

// Helper to check if API is reachable
export async function healthCheck(): Promise<boolean> {
  try {
    await api.get("/api/schema/", { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
