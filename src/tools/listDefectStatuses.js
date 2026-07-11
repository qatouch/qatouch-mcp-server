import { apiGet, apiPost } from "../helpers/apiCall.js";
import { jsonResponse } from "./helpers.js";

export const listDefectStatusTools = [
  {
    name: "list_defect_statuses",
    description: "List all statuses available for QA Touch defects",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListDefectStatusTool(name) {
  if (name !== "list_defect_statuses") return null;

  const response =
      await apiGet(
          "/defects/status"
      );

  return jsonResponse(
      response.data
  );
}
