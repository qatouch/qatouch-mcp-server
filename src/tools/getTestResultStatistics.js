import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const testResultReportTools = [
  {
    name: "generate_test_run_report",
    description: "Generate a graphical test run report for a project. Provides pass/fail/blocked counts, execution count, status distribution, and completion metrics. Supports date range, milestone, test run, and module filters. Use this for test execution reports, test result summaries, and pass/fail analytics.",
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

export async function handleTestResultReportTool(
    name,
    args
) {
  if (name !== "generate_test_run_report") return null;

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
