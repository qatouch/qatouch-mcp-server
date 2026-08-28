import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const issueStatisticsTools = [
  {
    name: "get_issue_statistics",
    description: "Retrieve defect/issue statistics for a project, including totals, open/closed/resolved counts, and breakdowns by status, priority, severity, bug type, creator, assignee, and linkage to test cases and test runs.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description: "Encrypted project identifier"
        }
      },
      required: ["projectId"]
    }
  }
];

export async function handleIssueStatisticsTool(
    name,
    args
) {
  if (name !== "get_issue_statistics") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/issues/${args.projectId}`
      );

  return jsonResponse(
      response.data
  );
}
