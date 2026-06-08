import qaTouchApi from "../api/qatouch.js";

export const createBulkTestCaseTools = [
  {
    name: "create_bulk_test_cases",
    description: `
Create multiple QA Touch test cases from a single scenario.

IMPORTANT:
- Generate between 5 and 10 test cases.
- Cover positive, negative, validation, boundary and usability scenarios.
- Every test case must contain:
  - caseTitle
  - description
  - precondition
  - steps
  - expected results

IMPORTANT:
- Generate a complete professional test case.
- Every test case MUST contain four or more steps.
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
          type: "string"
        },
        sectionKey: {
          type: "string"
        },
        testCases: {
          type: "array",
          minItems: 1,
          maxItems: 10,
          items: {
            type: "object",
            properties: {
              caseTitle: {
                type: "string"
              },
              description: {
                type: "string"
              },
              precondition: {
                type: "string"
              },
              reference: {
                type: "string"
              },
              estimate: {
                type: "string"
              },
              steps: {
                type: "array",
                minItems: 4,
                items: {
                  type: "object",
                  properties: {
                    step: {
                      type: "string"
                    },
                    expectedResult: {
                      type: "string"
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
              "caseTitle",
              "steps"
            ]
          }
        }
      },
      required: [
        "projectKey",
        "sectionKey",
        "testCases"
      ]
    }
  }
];

export async function handleCreateBulkTestCaseTool(
    name,
    args
) {
  if (name !== "create_bulk_test_cases") {
    return null;
  }

  if (!Array.isArray(args.testCases)) {
    throw new Error(
        "testCases must be an array."
    );
  }

  const results = [];

  for (const testCase of args.testCases) {

    if (!testCase.caseTitle) {
      results.push({
        success: false,
        title: "Unknown",
        error: "caseTitle is required"
      });
      continue;
    }

    if (
        !Array.isArray(testCase.steps)
    ) {
      results.push({
        success: false,
        title: testCase.caseTitle,
        error: "steps array is required"
      });
      continue;
    }

    if (
        testCase.steps.length < 4
    ) {
      results.push({
        success: false,
        title: testCase.caseTitle,
        error:
            "Each test case must contain at least 4 steps"
      });
      continue;
    }

    let invalidStep = false;

    for (const [index, step] of testCase.steps.entries()) {
      if (
          !step.step ||
          !step.expectedResult
      ) {
        results.push({
          success: false,
          title: testCase.caseTitle,
          error:
              `Step ${index + 1} must contain step and expectedResult`
        });

        invalidStep = true;
        break;
      }
    }

    if (invalidStep) {
      continue;
    }

    const stepsTemplate = {};

    testCase.steps.forEach(
        (item, index) => {
          stepsTemplate[index] = {
            steps: item.step,
            expected_result:
            item.expectedResult
          };
        }
    );

    const requestParams = {
      projectKey: args.projectKey,
      sectionKey: args.sectionKey,
      caseTitle: testCase.caseTitle,
      description:
          testCase.description || "",
      precondition:
          testCase.precondition || "",
      reference:
          testCase.reference || "",
      estimate:
          testCase.estimate || "",
      steps_template:
          JSON.stringify(
              stepsTemplate
          )
    };

    try {

      const response =
          await qaTouchApi.post(
              "/testCase/steps",
              null,
              {
                params: requestParams
              }
          );

      results.push({
        success: true,
        title: testCase.caseTitle,
        response:
            response?.data?.message ||
            "Created successfully"
      });

    } catch (error) {

      let errorMessage =
          error.message;

      if (error.response?.data) {

        if (
            typeof error.response.data ===
            "string"
        ) {

          errorMessage =
              error.response.data;

        } else {

          errorMessage =
              JSON.stringify(
                  error.response.data
              );
        }
      }

      results.push({
        success: false,
        title: testCase.caseTitle,
        error: errorMessage
      });
    }
  }

  const created =
      results.filter(
          r => r.success
      ).length;

  const failed =
      results.filter(
          r => !r.success
      ).length;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
            {
              total:
              args.testCases.length,
              created,
              failed,
              results
            },
            null,
            2
        )
      }
    ]
  };
}