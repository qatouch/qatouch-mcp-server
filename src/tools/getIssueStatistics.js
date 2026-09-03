import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const issueReportTools = [
  {
    name: "generate_issue_report",
    description: "Generate a defect and issue report for a project. Provides issue counts, open/closed/resolved breakdowns, and analytics by status, priority, severity, bug type, creator, and assignee. Use this for defect reports, issue summaries, and bug analytics.",
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

export async function handleIssueReportTool(
    name,
    args
) {
  if (name !== "generate_issue_report") return null;

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
