import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createTextTestCaseTools = [
  {
    name: "create_text_test_case",
    description: "Create a QA Touch test case using the text template endpoint",
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
        },
        steps: {
          type: "string",
          description: "Plain-text test steps"
        },
        expectedResult: {
          type: "string",
          description: "Plain-text expected result"
        }
      },
      required: [
        "projectKey",
        "sectionKey",
        "caseTitle",
        "steps",
        "expectedResult"
      ]
    }
  }
];

export async function handleCreateTextTestCaseTool(
    name,
    args
) {
  if (name !== "create_text_test_case") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "sectionKey",
        "caseTitle",
        "steps",
        "expectedResult"
      ]
  );

  const response =
      await apiPost(
          "/testCase/text",
          null,
          {
            params: {
              projectKey: args.projectKey,
              sectionKey: args.sectionKey,
              caseTitle: args.caseTitle,
              description: args.description || "",
              reference: args.reference || "",
              estimate: args.estimate || "",
              precondition: args.precondition || "",
              steps: args.steps,
              expected_result: args.expectedResult
            }
          }
      );

  return jsonResponse(
      response.data
  );
}
