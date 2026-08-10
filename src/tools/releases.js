import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateRequired } from "./helpers.js";

export const releaseTools = [
  {
    name: "list_releases",
    description: "Get all releases from a project",
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

export async function handleReleaseTool(
    name,
    args
) {
  if (name !== "list_releases") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllMilestones/${args.projectKey}?page=${args.page || 1}`
  );

  return jsonResponse(
      response.data
  );
}