import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateRequired } from "./helpers.js";

export const requirementTools = [
  {
    name: "list_requirements",
    description: "Get all requirements from a project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        page: {
          type: "number",
          description: "Page number. Defaults to 1"
        }
      },
      required: ["projectKey"]
    }
  }
];

export async function handleRequirementTool(
    name,
    args
) {
  if (name !== "list_requirements") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllRequirements/${args.projectKey}?page=${args.page || 1}`
  );

  return jsonResponse(
      response.data
  );
}