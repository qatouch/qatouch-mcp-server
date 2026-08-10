import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateRequired } from "./helpers.js";

export const testRunTools = [
  {
    name: "list_test_runs",
    description: "Get all test runs from a project",
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

export async function handleTestRunTool(
    name,
    args
) {
  if (name !== "list_test_runs") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllTestRuns/${args.projectKey}?page=${args.page || 1}`
  );

  return jsonResponse(
      response.data
  );
}