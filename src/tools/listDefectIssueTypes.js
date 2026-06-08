import qaTouchApi from "../api/qatouch.js";
import { jsonResponse } from "./helpers.js";

export const listDefectIssueTypeTools = [
  {
    name: "list_defect_issue_types",
    description: "List all issue types available for QA Touch defects",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListDefectIssueTypeTool(name) {
  if (name !== "list_defect_issue_types") return null;

  const response =
      await qaTouchApi.get(
          "/defects/issueType"
      );

  return jsonResponse(
      response.data
  );
}
