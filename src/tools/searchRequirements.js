import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  normalizedSearchResponse,
  validateRequired
} from "./helpers.js";

export const searchRequirementTools = [
  {
    name: "search_requirements",
    description: "Fetch requirements for a project and search title and description",
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

export async function handleSearchRequirementTool(
    name,
    args
) {
  if (name !== "search_requirements") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const response =
      await apiGet(
          `/getAllRequirements/${args.projectKey}`
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
            "title",
            "name",
            "description",
            "desc"
          ]
      );

  return jsonResponse(
      normalizedSearchResponse(
          args.query,
          matches
      )
  );
}
