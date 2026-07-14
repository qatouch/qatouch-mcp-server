import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countModuleTools = [
  {
    name: "count_modules",
    description: "Get the total number of modules available for a QA Touch project",
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

export async function handleCountModuleTool(
    name,
    args
) {
  if (name !== "count_modules") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/count/getAllModules/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
