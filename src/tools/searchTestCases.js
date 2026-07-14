import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  normalizedSearchResponse,
  validateRequired
} from "./helpers.js";

export const searchTestCaseTools = [
  {
    name: "search_test_cases",
    description: "Fetch all test cases for a project and search test case title and description",
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

export async function handleSearchTestCaseTool(
    name,
    args
) {
  if (name !== "search_test_cases") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const response =
      await apiGet(
          `/getAllTestCases/${args.projectKey}`
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
            "caseTitle",
            "case_title",
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
