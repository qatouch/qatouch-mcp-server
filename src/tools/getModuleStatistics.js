import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const moduleReportTools = [
  {
    name: "generate_module_report",
    description: "Generate a per-module test execution and defect report for a project. Provides module-level pass rates, defect density, test execution counts, and overall quality aggregates. Use this for module reports, quality analytics, and module-level insights.",
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

export async function handleModuleReportTool(
    name,
    args
) {
  if (name !== "generate_module_report") return null;

  validateRequired(
      args,
      ["projectId"]
  );

  const response =
      await qaTouchApi.get(
          `/reports/modules/${args.projectId}`
      );

  return jsonResponse(
      response.data
  );
}
