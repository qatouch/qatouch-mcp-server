import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const listRequirementDocumentTools = [
  {
    name: "list_requirement_documents",
    description: "List requirement documents for a QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        }
      },
      required: ["projectKey"]
    }
  }
];

export async function handleListRequirementDocumentTool(
    name,
    args
) {
  if (name !== "list_requirement_documents") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await apiGet(
          `/getAllRequirementDocuments/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
