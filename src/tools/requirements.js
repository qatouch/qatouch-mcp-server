import qaTouchApi from "../api/qatouch.js";

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

  const response = await qaTouchApi.get(
      `/getAllRequirements/${args.projectKey}`
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