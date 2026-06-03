import qaTouchApi from "../api/qatouch.js";

export const testcaseTools = [
  {
    name: "list_test_cases",
    description: "Get all test cases from a project",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        }
      },
      required: ["projectKey"]
    }
  }
];

export async function handleTestCaseTool(
    name,
    args
) {
  if (name !== "list_test_cases") return null;

  const response = await qaTouchApi.get(
      `/getAllTestCases/${args.projectKey}`
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