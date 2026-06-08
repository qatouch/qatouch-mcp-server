import qaTouchApi from "../api/qatouch.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  normalizedSearchResponse,
  validateRequired
} from "./helpers.js";

export const searchReleaseTools = [
  {
    name: "search_releases",
    description: "Fetch releases for a project and search milestone name",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        query: {
          type: "string",
          description: "Search text"
        }
      },
      required: [
        "projectKey",
        "query"
      ]
    }
  }
];

export async function handleSearchReleaseTool(
    name,
    args
) {
  if (name !== "search_releases") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const response =
      await qaTouchApi.get(
          `/getAllMilestones/${args.projectKey}`
      );

  const records =
      extractRecords(
          response.data
      );

  const matches =
      filterRecords(
          records,
          args.query,
          [
            "milestone",
            "milestoneName",
            "milestone_name",
            "name",
            "title"
          ]
      );

  return jsonResponse(
      normalizedSearchResponse(
          args.query,
          matches
      )
  );
}
