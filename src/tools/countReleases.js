import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countReleaseTools = [
  {
    name: "count_releases",
    description: "Get the total number of releases available for a QA Touch project",
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

export async function handleCountReleaseTool(
    name,
    args
) {
  if (name !== "count_releases") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await apiGet(
          `/count/allMilestones/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
