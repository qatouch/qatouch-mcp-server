import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateRequired } from "./helpers.js";

export const defectTools = [
  {
    name: "list_defects",
    description: "Get all defects from a project",
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

export async function handleDefectTool(
    name,
    args
) {
  if (name !== "list_defects") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllDefects/${args.projectKey}`
  );

  return jsonResponse(
      response.data
  );
}