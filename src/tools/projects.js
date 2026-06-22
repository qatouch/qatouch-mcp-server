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

  let page = 1;
  let allProjects = [];

  while (true) {

    const response = await qaTouchApi.get(
      `/getAllProjects?page=${page}`
    );

    allProjects.push(
      ...response.data.data
    );

    if (!response.data.link.next) {
      break;
    }

    page++;
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          allProjects,
          null,
          2
        )
      }
    ]
  };
}