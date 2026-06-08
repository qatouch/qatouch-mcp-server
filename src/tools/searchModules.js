import qaTouchApi from "../api/qatouch.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  normalizedSearchResponse,
  validateRequired
} from "./helpers.js";

export const searchModuleTools = [
  {
    name: "search_modules",
    description: "Fetch modules for a project and search module name",
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

export async function handleSearchModuleTool(
    name,
    args
) {
  if (name !== "search_modules") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const response =
      await qaTouchApi.get(
          `/getAllModules/${args.projectKey}`
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
            "name",
            "module",
            "moduleName",
            "module_name",
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
