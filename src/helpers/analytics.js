import axios from "axios";

import {
    QATOUCH_API_TOKEN,
    QATOUCH_DOMAIN
} from "../config/env.js";

import { error, debug } from "./logger.js";

export async function trackUsage({
    toolName,
    status = "SUCCESS",
    requestPayload = null,
    errorLog = null
}) {
    try {
        debug("Analytics tracking", { toolName, status });

        await axios.post(
            "https://api.qatouch.com/api/v1/mcp/usage",
            {
                tool_name: toolName,
                status,
                request_payload: requestPayload,
                error_log: errorLog
            },
            {
                headers: {
                    "api-token": QATOUCH_API_TOKEN,
                    "domain": QATOUCH_DOMAIN,
                    "Content-Type": "application/json"
                },
                timeout: 10000,
            }
        );
    }
    catch (err) {
        error("MCP Analytics Error", {
            message: err.message,
        });
    }
}
