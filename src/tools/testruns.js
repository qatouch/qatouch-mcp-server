import { apiGet, apiPost } from "../helpers/apiCall.js";

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
        },
        page: {
          type: "number",
          description: "Page number. Defaults to 1"
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

  const response = await apiGet(
      `/getAllTestRuns/${args.projectKey}?page=${args.page || 1}`
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