import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const requirementReportTools = [
  {
    name: "generate_requirement_report",
    description: "Generate a requirement coverage and mapping report for a project. Provides total, mapped, and unmapped requirement counts, coverage percentage, status breakdown, and per-document requirement counts. Use this for requirement reports, coverage analytics, and requirement traceability summaries.",
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

export async function handleRequirementReportTool(
    name,
    args
) {
  if (name !== "generate_requirement_report") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/requirements/${args.projectId}`
      );

  return jsonResponse(
      response.data
  );
}
