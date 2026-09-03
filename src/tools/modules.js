import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateApiResponse, validateRequired } from "./helpers.js";

export const moduleTools = [
  {
    name: "list_modules",
    description: "Get all modules from a project",
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

export async function handleModuleTool(
    name,
    args
) {
  if (name !== "list_modules") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllModules/${args.projectKey}?page=${args.page || 1}`
  );

  validateApiResponse(response);

  return jsonResponse(
      response.data
  );
}