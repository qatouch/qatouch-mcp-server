import qaTouchApi from "../api/qatouch.js";
import { jsonResponse } from "./helpers.js";

export const countAllProjectTools = [
  {
    name: "count_all_projects",
    description: "Get the total number of QA Touch projects available for the domain",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleCountAllProjectTool(name) {
  if (name !== "count_all_projects") return null;

  const response =
      await qaTouchApi.get(
          "/count/allProjects"
      );

  return jsonResponse(
      response.data
  );
}
