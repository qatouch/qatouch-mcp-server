export function classifyAxiosError(error) {
  if (!error) {
    return {
      category: "UNKNOWN",
      message: "An unknown error occurred",
      actionable: "An unexpected error occurred. Please try again or contact support.",
    };
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT" || (error.message && error.message.includes("timeout"))) {
    return {
      category: "TIMEOUT",
      message: "Request timed out",
      actionable: "Request timed out. The QA Touch server took too long to respond. Please try again.",
    };
  }

  if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED" || error.code === "EAI_AGAIN") {
    return {
      category: "NETWORK",
      message: "QA Touch server unreachable",
      actionable: "Cannot reach the QA Touch server. Check your network connection or the QATOUCH_DOMAIN setting.",
    };
  }

  if (error.response) {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      return {
        category: "AUTH",
        message: "Invalid QA Touch API Key",
        actionable: "Authentication failed. Verify your QATOUCH_API_TOKEN is correct and has not expired.",
        status,
      };
    }

    if (status === 404) {
      return {
        category: "NOT_FOUND",
        message: "Resource not found",
        actionable: "The requested resource was not found. Check the projectKey, testRunKey, or other identifiers.",
        status,
      };
    }

    if (status === 429) {
      return {
        category: "RATE_LIMIT",
        message: "Rate limit exceeded",
        actionable: "Too many requests. Please wait a moment and try again.",
        status,
      };
    }

    if (status >= 500) {
      return {
        category: "SERVER",
        message: "QA Touch server error",
        actionable: "The QA Touch server encountered an internal error. Please try again later.",
        status,
      };
    }

    const data = error.response.data;
    let detail = "Request failed";
    if (typeof data === "string") {
      detail = data;
    } else if (data && typeof data === "object") {
      detail = data.message || data.error || data.detail || JSON.stringify(data);
    }

    return {
      category: "HTTP_ERROR",
      message: detail,
      actionable: `QA Touch API returned an error (${status}): ${detail}`,
      status,
    };
  }

  if (error.request && !error.response) {
    return {
      category: "NETWORK",
      message: "QA Touch server unreachable",
      actionable: "No response received from the QA Touch server. Check your network or the QATOUCH_DOMAIN setting.",
    };
  }

  return {
    category: "UNKNOWN",
    message: error.message || "Unknown error",
    actionable: error.message || "An unexpected error occurred. Please try again or contact support.",
  };
}

export function getActionableError(error) {
  const classified = classifyAxiosError(error);
  const actionable = new Error(classified.actionable);
  actionable.category = classified.category;
  actionable.originalMessage = classified.message;
  actionable.status = classified.status;
  return actionable;
}
