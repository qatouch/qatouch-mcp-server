import qaTouchApi from "../api/qatouch.js";
import { jsonResponse } from "./helpers.js";

export const listDefectSeverityTools = [
  {
    name: "list_defect_severities",
    description: "List all severities available for QA Touch defects",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListDefectSeverityTool(name) {
  if (name !== "list_defect_severities") return null;

  const response =
      await qaTouchApi.get(
          "/defects/severity"
      );

  return jsonResponse(
      response.data
  );
}
