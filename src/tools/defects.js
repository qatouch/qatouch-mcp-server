import qaTouchApi from "../api/qatouch.js";

export const defectTools = [
  {
    name: "list_defects",
    description: "Get all defects from a project",
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

export async function handleDefectTool(
    name,
    args
) {
  if (name !== "list_defects") return null;

  const response = await qaTouchApi.get(
      `/getAllDefects/${args.projectKey}`
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