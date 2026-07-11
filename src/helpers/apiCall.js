import qaTouchApi from "../api/qatouch.js";
import { getActionableError } from "./errors.js";

export async function apiGet(url, config = {}) {
  try {
    const response = await qaTouchApi.get(url, config);
    return response;
  } catch (error) {
    throw getActionableError(error);
  }
}

export async function apiPost(url, data, config = {}) {
  try {
    const response = await qaTouchApi.post(url, data, config);
    return response;
  } catch (error) {
    throw getActionableError(error);
  }
}
