import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createReleaseTools = [
  {
    name: "create_release",
    description: "Create a new release or milestone in a QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        milestone: {
          type: "string",
          description: "Release or milestone name"
        }
      },
      required: [
        "projectKey",
        "milestone"
      ]
    }
  }
];

export async function handleCreateReleaseTool(
    name,
    args
) {
  if (name !== "create_release") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "milestone"
      ]
  );

  const response =
      await apiPost(
          "/milestone",
          {
              projectKey: args.projectKey,
              milestone: args.milestone
          }
      );

  return jsonResponse(
      response.data
  );
}
