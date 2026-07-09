import axios from "axios";
import {
  QATOUCH_API_TOKEN,
  QATOUCH_DOMAIN
} from "../config/env.js";
import {
  setCorrelationId,
  getCorrelationId,
  error as logError,
  debug as logDebug,
} from "./logger.js";

const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000];

const qaTouchApi = axios.create({
  baseURL: "https://api.qatouch.com/api/v1",
  timeout: 30000,
  headers: {
    "api-token": QATOUCH_API_TOKEN,
    "domain": QATOUCH_DOMAIN,
    "Content-Type": "application/json"
  }
});

qaTouchApi.interceptors.request.use(
  (config) => {
    const correlation = getCorrelationId();
    if (correlation) {
      config.headers["X-Correlation-ID"] = correlation;
    }

    config.metadata = {
      startTime: Date.now(),
    };

    logDebug("QA Touch API Request", {
      method: config.method?.toUpperCase(),
      url: config.baseURL + (config.url || ""),
      headers: config.headers,
      params: config.params,
      data: config.data,
    });

    return config;
  },
  (error) => {
    logError("QA Touch API Request Error", {
      message: error.message,
    });
    return Promise.reject(error);
  }
);

function isRetryable(status) {
  return !status || status >= 500 || status === 429;
}

function isNetworkError(error) {
  return (
    !error.response &&
    error.code &&
    ["ECONNABORTED", "ENOTFOUND", "ECONNREFUSED", "EAI_AGAIN", "ETIMEDOUT"].includes(error.code)
  );
}

qaTouchApi.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config.metadata?.startTime || Date.now());
    logDebug("QA Touch API Response", {
      method: response.config.method?.toUpperCase(),
      url: response.config.baseURL + (response.config.url || ""),
      status: response.status,
      statusText: response.statusText,
      durationMs: duration,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const config = error.config;
    const duration = Date.now() - (config?.metadata?.startTime || Date.now());
    const retryCount = config?.metadata?.retryCount || 0;

    const logMeta = {
      method: config?.method?.toUpperCase(),
      url: config?.baseURL + (config?.url || ""),
      durationMs: duration,
      message: error.message,
    };

    if (error.response) {
      logMeta.status = error.response.status;
      logMeta.statusText = error.response.statusText;
      logMeta.responseData = error.response.data;
    }

    if (isNetworkError(error)) {
      logError("QA Touch API Network Error", logMeta);
    } else if (error.response?.status === 401 || error.response?.status === 403) {
      logError("QA Touch API Authentication Failure", logMeta);
    } else if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      logError("QA Touch API Timeout Failure", logMeta);
    } else {
      logError("QA Touch API Error", logMeta);
    }

    if (retryCount < MAX_RETRIES && (isNetworkError(error) || isRetryable(error.response?.status))) {
      const delay = RETRY_DELAYS[retryCount] || 4000;
      logError("QA Touch API Retry", {
        attempt: retryCount + 1,
        maxRetries: MAX_RETRIES,
        delayMs: delay,
        reason: error.message,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));

      config.metadata = {
        ...config.metadata,
        retryCount: retryCount + 1,
      };

      return qaTouchApi(config);
    }

    return Promise.reject(error);
  }
);

export default qaTouchApi;
