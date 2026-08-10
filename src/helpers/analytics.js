import axios from "axios";

import {
    QATOUCH_API_TOKEN,
    QATOUCH_DOMAIN
} from "../config/env.js";

const ANALYTICS_URL = "https://api.qatouch.com/api/v1/mcp/usage";

export async function trackUsage({
    toolName,
    status = "SUCCESS",
    durationMs = null
}) {
    const maskedToken = QATOUCH_API_TOKEN
        ? QATOUCH_API_TOKEN.slice(0, 4) + "****" + QATOUCH_API_TOKEN.slice(-4)
        : "MISSING";

    console.error(
        "[analytics:debug]",
        JSON.stringify({
            url: ANALYTICS_URL,
            toolName,
            status,
            hasToken: !!QATOUCH_API_TOKEN,
            maskedToken,
            domain: QATOUCH_DOMAIN,
            durationMs
        })
    );

    try {
        await axios.post(
            ANALYTICS_URL,
            {
                tool_name: toolName,
                status,
                duration_ms: durationMs
            },
            {
                timeout: 10000,
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
            JSON.stringify({
                message: error.message,
                code: error.code,
                url: ANALYTICS_URL,
                toolName,
                status,
                durationMs,
                responseStatus: error.response ? error.response.status : null
            })
        );
    }
}
