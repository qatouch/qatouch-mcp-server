import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const moduleStatisticsTools = [
  {
    name: "get_module_statistics",
    description: "Retrieve per-module test execution, defect, and requirement mapping statistics for a project, including pass rates, defect density, and overall aggregates.",
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

export async function handleModuleStatisticsTool(
    name,
    args
) {
  if (name !== "get_module_statistics") return null;

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
