import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const playwrightScriptTools = [
  {
    name: "get_playwright_scripts_by_project",
    description: "Get Playwright scripts for all test cases in a project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Encrypted Project ID"
        }
      },
      required: ["project_id"]
    }
  },
  {
    name: "get_playwright_script_by_case",
    description: "Get Playwright script for a single test case",
    inputSchema: {
      type: "object",
      properties: {
        case_id: {
          type: "string",
          description: "Encrypted Case ID"
        }
      },
      required: ["case_id"]
    }
  },
  {
    name: "get_playwright_scripts_by_module",
    description: "Get Playwright scripts for all test cases inside a module",
    inputSchema: {
      type: "object",
      properties: {
        module_id: {
          type: "string",
          description: "Encrypted Module ID"
        }
      },
      required: ["module_id"]
    }
  }
];

export async function handlePlaywrightScriptTool(
    name,
    args
) {
  if (name === "get_playwright_scripts_by_project") {
    validateRequired(
        args,
        ["project_id"]
    );

    const response = await qaTouchApi.get(
        `/playwright/scripts/project/${args.project_id}`
    );

    return jsonResponse(
        response.data
    );
  }

  if (name === "get_playwright_script_by_case") {
    validateRequired(
        args,
        ["case_id"]
    );

    const response = await qaTouchApi.get(
        `/playwright/scripts/case/${args.case_id}`
    );

    return jsonResponse(
        response.data
    );
  }

  if (name === "get_playwright_scripts_by_module") {
    validateRequired(
        args,
        ["module_id"]
    );

    const response = await qaTouchApi.get(
        `/playwright/scripts/module/${args.module_id}`
    );

    return jsonResponse(
        response.data
    );
  }

  return null;
}