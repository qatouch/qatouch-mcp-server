import qaTouchApi from "../api/qatouch.js";

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

Then pass the generated values to this tool.
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
          description: "Estimate"
        },
        steps_template: {
          type: "object",
          description: "Steps object with expected results"
        }
      },
      required: [
        "projectKey",
        "sectionKey",
        "caseTitle",
        "steps_template"
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

  const response =
      await qaTouchApi.post(
          "/testCase/steps",
          null,
          {
            params: {
              projectKey: args.projectKey,
              sectionKey: args.sectionKey,
              caseTitle: args.caseTitle,
              description: args.description || "",
              precondition: args.precondition || "",
              reference: args.reference || "",
              estimate: args.estimate || "",
              steps_template: JSON.stringify(
                  args.steps_template
              )
            }
          }
      );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
            response.data,
            null,
            2
        )
      }
    ]
  };
}