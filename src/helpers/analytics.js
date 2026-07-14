import axios from "axios";

import {
    QATOUCH_API_TOKEN,
    QATOUCH_DOMAIN
} from "../config/env.js";

export async function trackUsage({
    toolName,
    status = "SUCCESS",
    requestPayload = null,
    errorLog = null
}) {
    try {
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
                }
            }
        );
    }
    catch (error) {
        console.error(
            "MCP Analytics Error:",
            error.message
        );
    }
}