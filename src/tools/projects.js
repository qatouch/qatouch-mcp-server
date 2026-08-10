import qaTouchApi from "../api/qatouch.js";
import { jsonResponse } from "./helpers.js";

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

    const data = response.data && response.data.data ? response.data.data : [];
    allProjects.push(
      ...data
    );

    const nextLink = response.data && response.data.link ? response.data.link.next : null;
    if (!nextLink) {
      break;
    }

    page++;
  }

  return jsonResponse(
      allProjects
  );
}