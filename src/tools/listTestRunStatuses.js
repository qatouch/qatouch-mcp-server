import qaTouchApi from "../api/qatouch.js";
import { jsonResponse } from "./helpers.js";

export const listTestRunStatusTools = [
  {
    name: "list_test_run_statuses",
    description: "List all statuses available for QA Touch test runs",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleListTestRunStatusTool(name) {
  if (name !== "list_test_run_statuses") return null;

  const response =
      await qaTouchApi.get(
          "/testRuns/getAvailableStatuses"
      );

  return jsonResponse(
      response.data
  );
}
