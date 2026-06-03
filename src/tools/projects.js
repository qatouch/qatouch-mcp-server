import qaTouchApi from "../api/qatouch.js";

export const projectTools = [
  {
    name: "list_projects",
    description: "Retrieve all QA Touch projects",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

export async function handleProjectTool(name) {
  if (name !== "list_projects") return null;

  const response = await qaTouchApi.get("/getAllProjects");

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