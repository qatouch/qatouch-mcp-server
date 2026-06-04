import qaTouchApi from "../api/qatouch.js";

export const moduleTools = [
  {
    name: "list_modules",
    description: "Get all modules from a project",
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

export async function handleModuleTool(
    name,
    args
) {
  if (name !== "list_modules") return null;

  const response = await qaTouchApi.get(
      `/getAllModules/${args.projectKey}`
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