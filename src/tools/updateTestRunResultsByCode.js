import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const updateTestRunResultsByCodeTools = [
  {
    name: "update_test_run_results_by_code",
    description: "Batch update QA Touch test run result statuses by test case code",
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
        results: {
          type: "array",
          description: "Result updates",
          items: {
            type: "object",
            properties: {
              case: {
                type: "string",
                description: "Test case code"
              },
              status: {
                type: "number",
                description: "Status ID"
              }
            },
            required: [
              "case",
              "status"
            ]
          }
        },
        comments: {
          type: "string",
          description: "Update comments"
        }
      },
      required: [
        "projectKey",
        "testRunKey",
        "results"
      ]
    }
  }
];

export async function handleUpdateTestRunResultsByCodeTool(
    name,
    args
) {
  if (name !== "update_test_run_results_by_code") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "testRunKey",
        "results"
      ]
  );

  if (!Array.isArray(args.results) || !args.results.length) {
    throw new Error(
        "results must be a non-empty array"
    );
  }

  const resultPayload = {};

  args.results.forEach(
      (result, index) => {
        if (!result.case || result.status === undefined || result.status === null) {
          throw new Error(
              "Each result must include case and status"
          );
        }

        resultPayload[index] = {
          case: result.case,
          status: result.status
        };
      }
  );

  const response =
      await apiPost(
          "/testRunResults/testrun/code",
          null,
          {
            params: {
              project: args.projectKey,
              test_run: args.testRunKey,
              result: JSON.stringify(
                  resultPayload
              ),
              comments: args.comments || ""
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
