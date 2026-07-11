import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createRequirementDocumentTools = [
  {
    name: "create_requirement_document",
    description: "Create a requirement document in a QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        releaseKey: {
          type: "string",
          description: "Release Key"
        },
        title: {
          type: "string",
          description: "Requirement document title"
        }
      },
      required: [
        "projectKey",
        "releaseKey",
        "title"
      ]
    }
  }
];

export async function handleCreateRequirementDocumentTool(
    name,
    args
) {
  if (name !== "create_requirement_document") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "releaseKey",
        "title"
      ]
  );

  const response =
      await apiPost(
          "/requirement/document",
          null,
          {
            params: {
              projectKey: args.projectKey,
              releaseKey: args.releaseKey,
              title: args.title
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
