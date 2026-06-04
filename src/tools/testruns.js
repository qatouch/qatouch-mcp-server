import qaTouchApi from "../api/qatouch.js";

export const testRunTools = [
  {
    name: "list_test_runs",
    description: "Get all test runs from a project",
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

export async function handleTestRunTool(
    name,
    args
) {
  if (name !== "list_test_runs") return null;

  const response = await qaTouchApi.get(
      `/getAllTestRuns/${args.projectKey}`
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