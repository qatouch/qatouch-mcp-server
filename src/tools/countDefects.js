import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const countDefectTools = [
  {
    name: "count_defects",
    description: "Get the total number of defects available for a QA Touch project",
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

export async function handleCountDefectTool(
    name,
    args
) {
  if (name !== "count_defects") return null;

  validateRequired(
      args,
      ["projectKey"]
  );

  const response =
      await qaTouchApi.get(
          `/count/allDefects/${args.projectKey}`
      );

  return jsonResponse(
      response.data
  );
}
