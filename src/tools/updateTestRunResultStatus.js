import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const updateTestRunResultStatusTools = [
  {
    name: "update_test_run_result_status",
    description: "Update the status of a single QA Touch test run result",
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
        },
        status: {
          type: "string",
          description: "Status ID or status value"
        }
      },
      required: [
        "projectKey",
        "testRunKey",
        "resultKey",
        "status"
      ]
    }
  }
];

export async function handleUpdateTestRunResultStatusTool(
    name,
    args
) {
  if (name !== "update_test_run_result_status") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "testRunKey",
        "resultKey",
        "status"
      ]
  );

  const response =
      await qaTouchApi.patch(
          "/testRunResults/status",
          null,
          {
            params: {
              status: args.status,
              project: args.projectKey,
              test_run: args.testRunKey,
              run_result: args.resultKey
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
