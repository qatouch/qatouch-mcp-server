import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const listTestRunResultHistoryTools = [
  {
    name: "list_test_run_result_history",
    description: "List history for a QA Touch test run result",
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
        resultKey: {
          type: "string",
          description: "Result Key"
        }
      },
      required: [
        "projectKey",
        "testRunKey",
        "resultKey"
      ]
    }
  }
];

export async function handleListTestRunResultHistoryTool(
    name,
    args
) {
  if (name !== "list_test_run_result_history") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "testRunKey",
        "resultKey"
      ]
  );

  const response =
      await apiGet(
          `/testRunResults/history/${args.projectKey}/${args.testRunKey}/${args.resultKey}`
      );

  return jsonResponse(
      response.data
  );
}
