import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countRequirementTools = [
  {
    name: "count_requirements",
    description: "Get the total number of requirements available for a QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        }
      },
      required: ["projectKey"]
    }
  }
];

export async function handleCountRequirementTool(
    name,
    args
) {
  if (name !== "count_requirements") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/count/allRequirements/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
