import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const requirementStatisticsTools = [
  {
    name: "get_requirement_statistics",
    description: "Retrieve requirement coverage and mapping statistics for a project, including total/mapped/unmapped requirements, coverage percentage, status breakdown, and per-document requirement counts.",
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

export async function handleRequirementStatisticsTool(
    name,
    args
) {
  if (name !== "get_requirement_statistics") return null;

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
