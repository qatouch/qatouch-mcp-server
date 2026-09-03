import qaTouchApi from "../api/qatouch.js";
import { jsonResponse, validateApiResponse, validateRequired } from "./helpers.js";

export const testcaseTools = [
  {
    name: "list_test_cases",
    description: "Get test cases from a project",
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

export async function handleTestCaseTool(
    name,
    args
) {
  if (name !== "list_test_cases") return null;

  validateRequired(args, ["projectKey"]);

  const response = await qaTouchApi.get(
      `/getAllTestCases/${args.projectKey}?page=${args.page || 1}`
  );

  validateApiResponse(response);

  return jsonResponse(
      response.data
  );
}