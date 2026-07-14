import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createExploratoryTestCaseTools = [
  {
    name: "create_exploratory_test_case",
    description: "Create a QA Touch exploratory-session test case without structured steps",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        sectionKey: {
          type: "string",
          description: "Section Key"
        },
        caseTitle: {
          type: "string",
          description: "Test case title"
        },
        description: {
          type: "string",
          description: "Test case description"
        },
        reference: {
          type: "string",
          description: "Reference"
        },
        estimate: {
          type: "string",
          description: "Estimate"
        },
        precondition: {
          type: "string",
          description: "Preconditions"
        }
      },
      required: [
        "projectKey",
        "sectionKey",
        "caseTitle"
      ]
    }
  }
];

export async function handleCreateExploratoryTestCaseTool(
    name,
    args
) {
  if (name !== "create_exploratory_test_case") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "sectionKey",
        "caseTitle"
      ]
  );

  const response =
      await qaTouchApi.post(
          "/testCase",
          null,
          {
            params: {
              projectKey: args.projectKey,
              sectionKey: args.sectionKey,
              caseTitle: args.caseTitle,
              description: args.description || "",
              reference: args.reference || "",
              estimate: args.estimate || "",
              precondition: args.precondition || ""
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
