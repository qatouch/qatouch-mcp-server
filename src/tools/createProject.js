import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createProjectTools = [
  {
    name: "create_project",
    description: "Create a new QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Project name"
        }
      },
      required: ["name"]
    }
  }
];

export async function handleCreateProjectTool(
    name,
    args
) {
  if (name !== "create_project") return null;

  validateRequired(
      args,
      ["name"]
  );

  const response =
      await apiPost(
          "/project",
          {
            name: args.name
          }
      );

  return jsonResponse(
      response.data
  );
}
