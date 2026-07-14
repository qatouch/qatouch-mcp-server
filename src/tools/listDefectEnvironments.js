import { apiGet, apiPost } from "../helpers/apiCall.js";
import { jsonResponse } from "./helpers.js";

export const listDefectEnvironmentTools = [
  {
    name: "list_defect_environments",
    description: "List all environments available for QA Touch defects",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListDefectEnvironmentTool(name) {
  if (name !== "list_defect_environments") return null;

  const response =
      await apiGet(
          "/defects/environment"
      );

  return jsonResponse(
      response.data
  );
}
