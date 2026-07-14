import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createTestCaseTools = [
  {
    name: "create_test_case",
    description: `
 Create a QA Touch test case.

 Before calling this tool, generate a complete professional test case including:
 - caseTitle
 - description
 - precondition
 - steps
 - expected results

 IMPORTANT:

 The tool MUST receive:

 {
   "steps": [
     {
       "step": "Open browser",
       "expectedResult": "Browser opens"
     }
   ]
 }

 NEVER send:
 - steps_template
 - step_description
 - expected_result

 The MCP server automatically converts steps into QA Touch format.

 Only provide:
 - step
 - expectedResult

 Rules:
 - Generate a complete professional test case.
 - Every test case MUST contain 4 or more steps.
 - Every step MUST contain:
   - step
   - expectedResult
 - expectedResult must never be empty.
 - Do NOT generate steps_template.
 - Generate steps array only.
 `,
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
        precondition: {
          type: "string",
          description: "Preconditions"
        },
        reference: {
          type: "string",
          description: "Reference"
        },
        estimate: {
          type: "string",
          description:
              "Estimated execution time in minutes. Example: 5, 10, 15"
        },
        steps: {
          type: "array",
          description: "Test steps with expected results",
          items: {
            type: "object",
            properties: {
              step: {
                type: "string",
                description: "Test step"
              },
              expectedResult: {
                type: "string",
                description: "Expected result"
              }
            },
            required: [
              "step",
              "expectedResult"
            ]
          }
        }
      },
      required: [
        "projectKey",
        "sectionKey",
        "caseTitle",
        "steps"
      ]
    }
  }
];

export async function handleCreateTestCaseTool(
    name,
    args
) {
  if (name !== "create_test_case") {
    return null;
  }

  if (args.steps_template) {
    throw new Error(
        "steps_template is not allowed. Provide steps[] only."
    );
  }

  if (!args.steps || !Array.isArray(args.steps)) {
    throw new Error(
        "steps array is required."
    );
  }

  if (args.steps.length < 4) {
    throw new Error(
        "A test case must contain at least 4 steps."
    );
  }

  for (const [index, step] of args.steps.entries()) {
    if (!step.step || !step.expectedResult) {
      throw new Error(
          `Step ${index + 1} must contain both step and expectedResult.`
      );
    }
  }

  const stepsTemplate = {};

  args.steps.forEach((item, index) => {
    stepsTemplate[index] = {
      steps: item.step,
      expected_result: item.expectedResult
    };
  });

  const requestParams = {
    projectKey: args.projectKey,
    sectionKey: args.sectionKey,
    caseTitle: args.caseTitle,
    description: args.description || "",
    precondition: args.precondition || "",
    reference: args.reference || "",
    estimate: args.estimate || "",
    steps_template: JSON.stringify(
        stepsTemplate
    )
  };

  const response =
      await apiPost(
          "/testCase/steps",
          null,
          {
            params: requestParams
          }
      );

  return jsonResponse(
      response.data
  );
}
