import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createModuleTools = [
  {
    name: "create_module",
    description: "Create a module in a QA Touch project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        moduleName: {
          type: "string",
          description: "Module name"
        }
      },
      required: [
        "projectKey",
        "moduleName"
      ]
    }
  }
];

export async function handleCreateModuleTool(
    name,
    args
) {
  if (name !== "create_module") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "moduleName"
      ]
  );

  const payload = {
      projectKey: args.projectKey,
      moduleName: args.moduleName
  };

  const response = await qaTouchApi.post(
      "/module",
      payload
  );

  return jsonResponse(
      response.data
  );
}
