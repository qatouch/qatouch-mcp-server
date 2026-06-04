#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import {
  projectTools,
  handleProjectTool
} from "./tools/projects.js";

import {
  testcaseTools,
  handleTestCaseTool
} from "./tools/testcases.js";

import {
  defectTools,
  handleDefectTool
} from "./tools/defects.js";

import {
    testRunTools,
    handleTestRunTool
} from "./tools/testruns.js";

import {
    moduleTools,
    handleModuleTool
} from "./tools/modules.js";

import {
    releaseTools,
    handleReleaseTool
} from "./tools/releases.js";

import {
    requirementTools,
    handleRequirementTool
} from "./tools/requirements.js";

import {
    createTestCaseTools,
    handleCreateTestCaseTool
} from "./tools/createTestCase.js";

const server = new Server(
    {
      name: "qatouch-mcp-server",
      version: "1.0.3"
    },
    {
      capabilities: {
        tools: {}
      }
    }
);

server.setRequestHandler(
    ListToolsRequestSchema,
    async () => {
      return {
        tools: [
            ...projectTools,
            ...testcaseTools,
            ...testRunTools,
            ...moduleTools,
            ...defectTools,
            ...releaseTools,
            ...requirementTools,
            ...createTestCaseTools
        ]
      };
    }
);

server.setRequestHandler(
    CallToolRequestSchema,
    async (request) => {
      const {
        name,
        arguments: args
      } = request.params;

      try {

        let result =
            await handleProjectTool(
                name,
                args
            );

        if (!result) {
          result =
              await handleTestCaseTool(
                  name,
                  args
              );
        }

        if (!result) {
          result =
              await handleDefectTool(
                  name,
                  args
              );
        }
        if (!result) {
          result =
              await handleModuleTool(
                  name,
                  args
              );
        }
        if (!result) {
          result =
              await handleCreateTestCaseTool(
                  name,
                  args
              );
        }
        if (!result) {
          result =
              await handleTestRunTool(
                  name,
                  args
              );
        }

        if (!result) {
          result =
              await handleReleaseTool(
                  name,
                  args
              );
        }
        if (!result) {
          result =
              await handleRequirementTool(
                  name,
                  args
              );
        }

        if (!result) {
          throw new Error(
              `Unknown tool: ${name}`
          );
        }

        return result;

      } catch (error) {

        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                  error.response?.data
                      ? JSON.stringify(
                      error.response.data,
                      null,
                      2
                      )
                      : error.message
            }
          ]
        };
      }
    }
);

async function run() {
  const transport =
      new StdioServerTransport();

  await server.connect(
      transport
  );

  console.error(
      "QA Touch MCP Server running"
  );
}

run();