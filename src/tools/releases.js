import qaTouchApi from "../api/qatouch.js";

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

  const response = await qaTouchApi.get(
      `/getAllMilestones/${args.projectKey}`
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