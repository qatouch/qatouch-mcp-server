import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const updateTestCaseTools = [
  {
    name: "update_test_case",
    description: "Update a QA Touch test case. Supports Exploratory, Steps, Text and BDD templates automatically.",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        caseKey: {
          type: "string",
          description: "Case Key"
        },
        caseTitle: {
          type: "string",
          description: "Test case title"
        },
        description: {
          type: "string",
          description: "Description"
        },
        precondition: {
          type: "string",
          description: "Precondition"
        },
        reference: {
          type: "string",
          description: "Reference"
        },
        estimate: {
          type: "string",
          description: "Estimate"
        },
        mode: {
          type: "string",
          description: "manual or automation"
        },
        approval: {
          type: "string",
          description: "approve, reject or reverify"
        },
        type: {
          type: "string",
          description: "Case type"
        },
        priority: {
          type: "string",
          description: "Priority"
        },
        test_data: {
          type: "string",
          description: "Test data"
        },
        newtags: {
          type: "array",
          description: "Tags"
        },
        steps_template: {
          type: "array",
          description: "Steps with expected results"
        },
        feature_script: {
          type: "string",
          description: "BDD Feature script"
        }
      },
      required: [
        "projectKey",
        "caseKey"
      ]
    }
  }
];

export async function handleUpdateTestCaseTool(
    name,
    args
) {
  if (name !== "update_test_case") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "caseKey"
      ]
  );

  const response =
      await qaTouchApi.post(
          "/testcase/update/common",
          null,
          {
            params: args
          }
      );

  return jsonResponse(
      response.data
  );
}