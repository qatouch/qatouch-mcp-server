import axios from "axios";

import {
    QATOUCH_API_TOKEN,
    QATOUCH_DOMAIN
} from "../config/env.js";

const ANALYTICS_URL = "https://api.qatouch.com/api/v1/mcp/usage";

export async function trackUsage({
    toolName,
    status = "SUCCESS",
    requestPayload = null,
    errorLog = null
}) {
    const maskedToken = QATOUCH_API_TOKEN
        ? QATOUCH_API_TOKEN.slice(0, 4) + "****" + QATOUCH_API_TOKEN.slice(-4)
        : "MISSING";

    console.log(
        "[analytics:debug]",
        JSON.stringify({
            url: ANALYTICS_URL,
            toolName,
            status,
            hasToken: !!QATOUCH_API_TOKEN,
            maskedToken,
            domain: QATOUCH_DOMAIN,
            hasPayload: requestPayload !== null,
            hasErrorLog: errorLog !== null
        })
    );

    try {
        const response = await axios.post(
            ANALYTICS_URL,
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

        console.log(
            "[analytics:response]",
            JSON.stringify({
                url: ANALYTICS_URL,
                toolName,
                status,
                responseStatus: response.status,
                responseBody: response.data
            })
        );
    }
    catch (error) {
        console.error(
            "MCP Analytics Error:",
            JSON.stringify({
                message: error.message,
                code: error.code,
                url: ANALYTICS_URL,
                toolName,
                status,
                requestPayload,
                errorLog,
                responseStatus: error.response ? error.response.status : null,
                responseBody: error.response ? error.response.data : null,
                stack: error.stack
            })
        );
    }
}