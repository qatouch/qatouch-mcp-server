import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const projectInsightsTools = [
  {
    name: "get_project_insights",
    description: "Retrieve multi-dimensional project insights including burndown, velocity, open issues, defect trend, requirement coverage, automation coverage, tester productivity, release comparison, developer/tester TAT, and risk heatmap.",
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

export async function handleProjectInsightsTool(
    name,
    args
) {
  if (name !== "get_project_insights") return null;

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
