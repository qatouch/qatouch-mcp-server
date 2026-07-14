import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countTestRunTools = [
  {
    name: "count_test_runs",
    description: "Get the total number of test runs available for a QA Touch project",
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

export async function handleCountTestRunTool(
    name,
    args
) {
  if (name !== "count_test_runs") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/count/allTestRuns/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
