import { apiGet, apiPost } from "../helpers/apiCall.js";

export const requirementTools = [
  {
    name: "list_requirements",
    description: "Get all requirements from a project",
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

export async function handleRequirementTool(
    name,
    args
) {
  if (name !== "list_requirements") return null;

  const response = await apiGet(
      `/getAllRequirements/${args.projectKey}?page=${args.page || 1}`
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