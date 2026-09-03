import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const testCaseReportTools = [
  {
    name: "generate_test_case_report",
    description: "Generate a test case report with analytics for a project. Provides test case counts, breakdowns by priority, type, tag, module, test suite, automation status, and approval status. Supports filtering by module, priority, type, tag, creator, and date range. Use this for test case summaries, analytics, and reporting.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Encrypted project identifier"
        },
        module_ids: {
          type: "string",
          description: "Comma-separated module IDs"
        },
        priority_ids: {
          type: "string",
          description: "Comma-separated priority IDs"
        },
        type_ids: {
          type: "string",
          description: "Comma-separated case type IDs"
        },
        tag_ids: {
          type: "string",
          description: "Comma-separated tag IDs"
        },
        test_suite_ids: {
          type: "string",
          description: "Comma-separated test suite type IDs"
        },
        created_by: {
          type: "string",
          description: "Comma-separated creator user IDs"
        },
        from_date: {
          type: "string",
          description: "Start datetime filter (e.g., 2024-01-01 00:00:00)"
        },
        to_date: {
          type: "string",
          description: "End datetime filter (e.g., 2024-01-31 23:59:59)"
        },
        tag_limit: {
          type: "integer",
          description: "Maximum number of tags to return (1-100, default: 10)"
        },
        module_limit: {
          type: "integer",
          description: "Maximum number of modules to return (1-200, default: 50)"
        },
        group_by: {
          type: "string",
          description: "Time grouping interval for creation_trend: day, week, month (default: day)"
        }
      },
      required: ["projectId"]
    }
  }
];

export async function handleTestCaseReportTool(
    name,
    args
) {
  if (name !== "generate_test_case_report") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/testcases/${args.projectId}`,
          {
            params: {
              module_ids: args.module_ids || undefined,
              priority_ids: args.priority_ids || undefined,
              type_ids: args.type_ids || undefined,
              tag_ids: args.tag_ids || undefined,
              test_suite_ids: args.test_suite_ids || undefined,
              created_by: args.created_by || undefined,
              from_date: args.from_date || undefined,
              to_date: args.to_date || undefined,
              tag_limit: args.tag_limit || undefined,
              module_limit: args.module_limit || undefined,
              group_by: args.group_by || undefined
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
