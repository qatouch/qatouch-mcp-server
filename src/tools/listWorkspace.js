import { apiGet, apiPost } from "../helpers/apiCall.js";
import { jsonResponse } from "./helpers.js";

export const listWorkspaceTools = [
  {
    name: "list_workspace",
    description: "List all QA Touch workspaces available for the domain",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListWorkspaceTool(name) {
  if (name !== "list_workspace") return null;

  const response =
      await apiGet(
          "/getAllWorkspace"
      );

  return jsonResponse(
      response.data
  );
}
