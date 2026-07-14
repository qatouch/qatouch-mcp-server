import { apiGet, apiPost } from "../helpers/apiCall.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createRequirementTools = [
  {
    name: "create_requirement",
    description: "Create a requirement in a QA Touch project requirement document",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Project Key"
        },
        documentKey: {
          type: "string",
          description: "Requirement Document Key"
        },
        title: {
          type: "string",
          description: "Requirement title"
        },
        desc: {
          type: "string",
          description: "Requirement description"
        }
      },
      required: [
        "projectKey",
        "documentKey",
        "title",
        "desc"
      ]
    }
  }
];

export async function handleCreateRequirementTool(
    name,
    args
) {
  if (name !== "create_requirement") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "documentKey",
        "title",
        "desc"
      ]
  );

  const response =
      await apiPost(
          "/requirement",
          {
              projectKey: args.projectKey,
              documentKey: args.documentKey,
              title: args.title,
              desc: args.desc
          }
      );

  return jsonResponse(
      response.data
  );
}
