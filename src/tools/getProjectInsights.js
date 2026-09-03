import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const projectReportTools = [
  {
    name: "generate_project_report",
    description: "Generate a comprehensive project report with multi-dimensional insights for QA Touch. Provides burndown charts, velocity tracking, open issues, defect trends, requirement coverage, automation coverage, tester productivity, release comparison, and risk heatmaps. Use this for project reports, analytics summaries, and quality insights.",
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
        }
      },
      required: ["projectId"]
    }
  }
];

export async function handleProjectReportTool(
    name,
    args
) {
  if (name !== "generate_project_report") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/insights/${args.projectId}`,
          {
            params: {
              from_date: args.from_date || undefined,
              to_date: args.to_date || undefined
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
