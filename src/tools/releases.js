import { apiGet, apiPost } from "../helpers/apiCall.js";

export const releaseTools = [
  {
    name: "list_releases",
    description: "Get all releases from a project",
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

export async function handleReleaseTool(
    name,
    args
) {
  if (name !== "list_releases") return null;

  const response = await apiGet(
      `/getAllMilestones/${args.projectKey}?page=${args.page || 1}`
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