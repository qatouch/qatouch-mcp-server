import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const listTestRunAvailableUserTools = [
  {
    name: "list_test_run_available_users",
    description: "List users available for testing in a QA Touch project",
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

export async function handleListTestRunAvailableUserTool(
    name,
    args
) {
  if (name !== "list_test_run_available_users") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/testRun/availableUsers/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
