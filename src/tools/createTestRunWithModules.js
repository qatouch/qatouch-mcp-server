import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";

export const createTestRunWithModulesTools = [
  {
    name: "create_test_run_with_modules",
    description: "Create a new test run by selecting one or more module keys. All test cases from the specified modules should be included in the test run.",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "QA Touch project key."
        },
        testRun: {
          type: "string",
          description: "Name of the test run."
        },
        moduleKeys: {
          type: "array",
          items: {
            type: "string"
          },
          description: "One or more module keys."
        },
        assignTo: {
          type: "string",
          description: "User key to assign the test run."
        },
        milestoneKey: {
          type: "string",
          description: "Milestone key. If omitted, defaults to 0DLB."
        }
      },
      required: [
        "projectKey",
        "testRun",
        "moduleKeys"
      ]
    }
  }
];

export async function handleCreateTestRunWithModulesTool(
    name,
    args
) {
  if (name !== "create_test_run_with_modules") {
    return null;
  }

  validateRequired(
      args,
      [
        "projectKey",
        "testRun",
        "moduleKeys"
      ]
  );

  if (!Array.isArray(args.moduleKeys) || args.moduleKeys.length === 0) {
    throw new Error(
        "moduleKeys must be a non-empty array."
    );
  }

  const cleanedModuleKeys = [
    ...new Set(
      args.moduleKeys.map(
        key => String(key).trim()
      ).filter(
        key => key.length > 0
      )
    )
  ];

  if (cleanedModuleKeys.length === 0) {
    throw new Error(
        "moduleKeys must contain at least one valid module key."
    );
  }

  const params = new URLSearchParams();
  params.set("projectKey", args.projectKey);
  params.set("testRun", args.testRun);
  params.set("moduleKeys", cleanedModuleKeys.join(","));

  if (args.assignTo) {
    params.set("assignTo", args.assignTo);
  }

  params.set("milestoneKey", args.milestoneKey || "0DLB");

  const response = await qaTouchApi.post(
      "/testRun/module",
      null,
      {
        params: params
      }
  );

  return jsonResponse(
      response.data
  );
}
