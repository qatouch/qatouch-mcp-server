import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const listTestRunResultTools = [
  {
    name: "list_test_run_results",
    description: "List all results for a QA Touch test run",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        testRunKey: {
          type: "string",
          description: "Test Run Key"
        },
        page: {
          type: "number",
          description: "Page number. Defaults to 1"
        }
      },
      required: [
        "projectKey",
        "testRunKey"
      ]
    }
  }
];

export async function handleListTestRunResultTool(
    name,
    args
) {
  if (name !== "list_test_run_results") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "testRunKey"
      ]
  );

  const response =
      await apiGet(
          `/testRunResults/${args.projectKey}/${args.testRunKey}?page=${args.page || 1}`
      );

  return jsonResponse(
      response.data
  );
}