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

  const results = [];

  for (const testCase of args.testCases) {

    const stepsTemplate = {};

    (testCase.steps || []).forEach(
        (step, index) => {
          stepsTemplate[index] = {
            steps: step.step,
            expected_result:
            step.expectedResult
          };
        }
    );

    try {

      const response =
          await qaTouchApi.post(
              "/testcase/steps",
              null,
              {
                params: {
                  projectKey:
                  args.projectKey,

                  sectionKey:
                  args.sectionKey,

                  caseTitle:
                  testCase.caseTitle,

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
                }
              }
          );

      results.push({
        title:
        testCase.caseTitle,
        success: true,
        response:
        response.data
      });

    } catch (error) {

      results.push({
        title:
        testCase.caseTitle,
        success: false,
        error:
            (
              error.response &&
              error.response.data
            ) ||
            error.message
      });

    }
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
            {
              total:
              args.testCases.length,

              created:
              results.filter(
                  r => r.success
              ).length,

              failed:
              results.filter(
                  r => !r.success
              ).length,

              results
            },
            null,
            2
        )
      }
    ]
  };
}
