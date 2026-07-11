import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  extractRecords,
  filterRecords,
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const searchProjectTools = [
  {
    name: "search_project",
    description: "Search test cases, modules, requirements, defects and releases in a QA Touch project and return grouped results",
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

export async function handleSearchProjectTool(
    name,
    args
) {
  if (name !== "search_project") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "query"
      ]
  );

  const [
    testCaseResponse,
    moduleResponse,
    requirementResponse,
    defectResponse,
    releaseResponse
  ] =
      await Promise.all([
        qaTouchApi.get(
            `/getAllTestCases/${args.projectKey}`
        ),
        qaTouchApi.get(
            `/getAllModules/${args.projectKey}`
        ),
        qaTouchApi.get(
            `/getAllRequirements/${args.projectKey}`
        ),
        qaTouchApi.get(
            `/getAllDefects/${args.projectKey}`
        ),
        qaTouchApi.get(
            `/getAllMilestones/${args.projectKey}`
        )
      ]);

  const testCases =
      filterRecords(
          extractRecords(
              testCaseResponse.data
          ),
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

  const modules =
      filterRecords(
          extractRecords(
              moduleResponse.data
          ),
          args.query,
          [
            "name",
            "module",
            "moduleName",
            "module_name",
            "title"
          ]
      );

  const requirements =
      filterRecords(
          extractRecords(
              requirementResponse.data
          ),
          args.query,
          [
            "title",
            "name",
            "description",
            "desc"
          ]
      );

  const defects =
      filterRecords(
          extractRecords(
              defectResponse.data
          ),
          args.query,
          [
            "issueSummary",
            "issue_summary",
            "summary",
            "title",
            "name"
          ]
      );

  const releases =
      filterRecords(
          extractRecords(
              releaseResponse.data
          ),
          args.query,
          [
            "milestone",
            "milestoneName",
            "milestone_name",
            "name",
            "title"
          ]
      );

  const groupedResults = {
    query: args.query,
    total:
        testCases.length +
        modules.length +
        requirements.length +
        defects.length +
        releases.length,
    testCases: {
      total: testCases.length,
      results: testCases
    },
    modules: {
      total: modules.length,
      results: modules
    },
    requirements: {
      total: requirements.length,
      results: requirements
    },
    defects: {
      total: defects.length,
      results: defects
    },
    releases: {
      total: releases.length,
      results: releases
    }
  };

  return jsonResponse(
      groupedResults
  );
}
