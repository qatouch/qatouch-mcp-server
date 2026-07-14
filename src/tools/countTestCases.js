import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countTestCaseTools = [
  {
    name: "count_test_cases",
    description: "Get the total number of test cases available for a QA Touch project",
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

export async function handleCountTestCaseTool(
    name,
    args
) {
  if (name !== "count_test_cases") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/count/allTestCases/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
