import qaTouchApi from "../api/qatouch.js";
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
      await qaTouchApi.get(
          "/getAllWorkspace"
      );

  return jsonResponse(
      response.data
  );
}
