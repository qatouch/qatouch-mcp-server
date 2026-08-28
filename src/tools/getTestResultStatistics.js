import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const testResultStatisticsTools = [
  {
    name: "get_test_result_statistics",
    description: "Retrieve aggregated test run result statistics for a project, including pass/fail counts, status distribution, and completion metrics. Supports optional date range, milestone, test run, and module filters.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Encrypted project identifier"
        },
        from_date: {
          type: "string",
          description: "Start datetime filter (e.g., 2024-01-01 00:00:00)"
        },
        to_date: {
          type: "string",
          description: "End datetime filter (e.g., 2024-01-31 23:59:59)"
        },
        milestone_ids: {
          type: "string",
          description: "Comma-separated milestone IDs"
        },
        testRunId: {
          type: "string",
          description: "Encrypted test run ID"
        },
        moduleId: {
          type: "string",
          description: "Encrypted module/section ID"
        }
      },
      required: ["projectId"]
    }
  }
];

export async function handleTestResultStatisticsTool(
    name,
    args
) {
  if (name !== "get_test_result_statistics") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/testresults/${args.projectId}`,
          {
            params: {
              from_date: args.from_date || undefined,
              to_date: args.to_date || undefined,
              milestone_ids: args.milestone_ids || undefined,
              testRunId: args.testRunId || undefined,
              moduleId: args.moduleId || undefined
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
