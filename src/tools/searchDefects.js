import qaTouchApi from "../api/qatouch.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  normalizedSearchResponse,
  validateRequired
} from "./helpers.js";

export const searchDefectTools = [
  {
    name: "search_defects",
    description: "Fetch defects for a project and search issue summary",
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

export async function handleSearchDefectTool(
    name,
    args
) {
  if (name !== "search_defects") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const response =
      await qaTouchApi.get(
          `/getAllDefects/${args.projectKey}`
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
            "issueSummary",
            "issue_summary",
            "summary",
            "title",
            "name"
          ]
      );

  return jsonResponse(
      normalizedSearchResponse(
          args.query,
          matches
      )
  );
}
