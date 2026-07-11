import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createDefectTools = [
  {
    name: "create_defect",
    description: "Create a QA Touch defect with priority and issue summary",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        priority: {
          type: "string",
          description: "Defect priority"
        },
        issueSummary: {
          type: "string",
          description: "Issue summary"
        }
      },
      required: [
        "projectKey",
        "priority",
        "issueSummary"
      ]
    }
  }
];

export async function handleCreateDefectTool(
    name,
    args
) {
  if (name !== "create_defect") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "priority",
        "issueSummary"
      ]
  );

  const response =
      await apiPost(
          "/defects",
          null,
          {
            params: {
              projectKey: args.projectKey,
              priority: args.priority,
              issueSummary: args.issueSummary
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
