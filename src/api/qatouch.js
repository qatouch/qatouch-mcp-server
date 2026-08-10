import axios from "axios";
import {
  QATOUCH_API_TOKEN,
  QATOUCH_DOMAIN
} from "../config/env.js";

const qaTouchApi = axios.create({
  baseURL: "https://api.qatouch.com/api/v1",
  timeout: 30000,
  headers: {
    "api-token": QATOUCH_API_TOKEN,
    "domain": QATOUCH_DOMAIN,
    "Content-Type": "application/json"
  }
});

export default qaTouchApi;
