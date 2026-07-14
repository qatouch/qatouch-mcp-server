#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { trackUsage } from "./helpers/analytics.js";

import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import {
  projectTools,
  handleProjectTool
} from "./tools/projects.js";

import {
    countAllProjectTools,
    handleCountAllProjectTool
} from "./tools/countAllProjects.js";

import {
    createProjectTools,
    handleCreateProjectTool
} from "./tools/createProject.js";

import {
  testcaseTools,
  handleTestCaseTool
} from "./tools/testcases.js";

import {
    countTestCaseTools,
    handleCountTestCaseTool
} from "./tools/countTestCases.js";

import {
    createExploratoryTestCaseTools,
    handleCreateExploratoryTestCaseTool
} from "./tools/createExploratoryTestCase.js";

import {
    createTextTestCaseTools,
    handleCreateTextTestCaseTool
} from "./tools/createTextTestCase.js";

import {
  defectTools,
  handleDefectTool
} from "./tools/defects.js";

import {
    listDefectStatusTools,
    handleListDefectStatusTool
} from "./tools/listDefectStatuses.js";

import {
    listDefectSeverityTools,
    handleListDefectSeverityTool
} from "./tools/listDefectSeverities.js";

import {
    listDefectIssueTypeTools,
    handleListDefectIssueTypeTool
} from "./tools/listDefectIssueTypes.js";

import {
    listDefectEnvironmentTools,
    handleListDefectEnvironmentTool
} from "./tools/listDefectEnvironments.js";

import {
    countDefectTools,
    handleCountDefectTool
} from "./tools/countDefects.js";

import {
    createDefectTools,
    handleCreateDefectTool
} from "./tools/createDefect.js";

import {
    testRunTools,
    handleTestRunTool
} from "./tools/testruns.js";

import {
    countTestRunTools,
    handleCountTestRunTool
} from "./tools/countTestRuns.js";

import {
    listTestRunResultTools,
    handleListTestRunResultTool
} from "./tools/listTestRunResults.js";

import {
    listTestRunResultHistoryTools,
    handleListTestRunResultHistoryTool
} from "./tools/listTestRunResultHistory.js";

import {
    listTestRunStatusTools,
    handleListTestRunStatusTool
} from "./tools/listTestRunStatuses.js";

import {
    updateTestRunResultStatusTools,
    handleUpdateTestRunResultStatusTool
} from "./tools/updateTestRunResultStatus.js";

import {
    listTestRunAvailableUserTools,
    handleListTestRunAvailableUserTool
} from "./tools/listTestRunAvailableUsers.js";

import {
    updateTestRunResultsByCodeTools,
    handleUpdateTestRunResultsByCodeTool
} from "./tools/updateTestRunResultsByCode.js";

import {
    moduleTools,
    handleModuleTool
} from "./tools/modules.js";

import {
    countModuleTools,
    handleCountModuleTool
} from "./tools/countModules.js";

import {
    createModuleTools,
    handleCreateModuleTool
} from "./tools/createModule.js";

import {
    releaseTools,
    handleReleaseTool
} from "./tools/releases.js";

import {
    countReleaseTools,
    handleCountReleaseTool
} from "./tools/countReleases.js";

import {
    createReleaseTools,
    handleCreateReleaseTool
} from "./tools/createRelease.js";

import {
    requirementTools,
    handleRequirementTool
} from "./tools/requirements.js";

import {
    countRequirementTools,
    handleCountRequirementTool
} from "./tools/countRequirements.js";

import {
    listRequirementDocumentTools,
    handleListRequirementDocumentTool
} from "./tools/listRequirementDocuments.js";

import {
    createRequirementDocumentTools,
    handleCreateRequirementDocumentTool
} from "./tools/createRequirementDocument.js";

import {
    createRequirementTools,
    handleCreateRequirementTool
} from "./tools/createRequirement.js";

import {
    listWorkspaceTools,
    handleListWorkspaceTool
} from "./tools/listWorkspace.js";

import {
    createTestCaseTools,
    handleCreateTestCaseTool
} from "./tools/createTestCase.js";

import {
    createBulkTestCaseTools,
    handleCreateBulkTestCaseTool
}
    from "./tools/createBulkTestCases.js";

import {
    searchTestCaseTools,
    handleSearchTestCaseTool
} from "./tools/searchTestCases.js";

import {
    searchModuleTools,
    handleSearchModuleTool
} from "./tools/searchModules.js";

import {
    searchRequirementTools,
    handleSearchRequirementTool
} from "./tools/searchRequirements.js";

import {
    searchDefectTools,
    handleSearchDefectTool
} from "./tools/searchDefects.js";

import {
    searchReleaseTools,
    handleSearchReleaseTool
} from "./tools/searchReleases.js";

import {
    searchProjectTools,
    handleSearchProjectTool
} from "./tools/searchProject.js";

import {
    projectAnalyticsTools,
    handleProjectAnalyticsTool
} from "./tools/getProjectAnalytics.js";

import {
    updateTestCaseTools,
    handleUpdateTestCaseTool
} from "./tools/updateTestCase.js";

import {
    importTestCaseTools,
    handleImportTestCaseTool
} from "./tools/importTestCases.js";

const server = new Server(
    {
      name: "qatouch-mcp-server",
      version: "1.1.2"
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
            ...countAllProjectTools,
            ...createProjectTools,
            ...testcaseTools,
            ...countTestCaseTools,
            ...testRunTools,
            ...countTestRunTools,
            ...listTestRunResultTools,
            ...listTestRunResultHistoryTools,
            ...listTestRunStatusTools,
            ...updateTestRunResultStatusTools,
            ...listTestRunAvailableUserTools,
            ...updateTestRunResultsByCodeTools,
            ...moduleTools,
            ...countModuleTools,
            ...createModuleTools,
            ...defectTools,
            ...listDefectStatusTools,
            ...listDefectSeverityTools,
            ...listDefectIssueTypeTools,
            ...listDefectEnvironmentTools,
            ...countDefectTools,
            ...createDefectTools,
            ...releaseTools,
            ...countReleaseTools,
            ...createReleaseTools,
            ...requirementTools,
            ...countRequirementTools,
            ...listRequirementDocumentTools,
            ...createRequirementDocumentTools,
            ...createRequirementTools,
            ...listWorkspaceTools,
            ...createTestCaseTools,
            ...createBulkTestCaseTools,
            ...createExploratoryTestCaseTools,
            ...createTextTestCaseTools,
            ...searchTestCaseTools,
            ...searchModuleTools,
            ...searchRequirementTools,
            ...searchDefectTools,
            ...searchReleaseTools,
            ...searchProjectTools,
             ...projectAnalyticsTools,
             ...updateTestCaseTools,
             ...importTestCaseTools,
         ]
      };
    }
);

async function dispatchTool(name, args) {
  let result =
      await handleProjectTool(
          name,
          args
      );

  if (!result) {
    result =
        await handleCountAllProjectTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateProjectTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleTestCaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCountTestCaseTool(
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
        await handleListDefectStatusTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListDefectSeverityTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListDefectIssueTypeTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListDefectEnvironmentTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCountDefectTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateDefectTool(
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
        await handleCountModuleTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateModuleTool(
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
        await handleCreateBulkTestCaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateExploratoryTestCaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateTextTestCaseTool(
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
        await handleCountTestRunTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListTestRunResultTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListTestRunResultHistoryTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListTestRunStatusTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleUpdateTestRunResultStatusTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListTestRunAvailableUserTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleUpdateTestRunResultsByCodeTool(
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
        await handleCountReleaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateReleaseTool(
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
    result =
        await handleCountRequirementTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListRequirementDocumentTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateRequirementDocumentTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleCreateRequirementTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleListWorkspaceTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchTestCaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchModuleTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchRequirementTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchDefectTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchReleaseTool(
            name,
            args
        );
  }
  if (!result) {
    result =
        await handleSearchProjectTool(
            name,
            args
        );
  }
  if (!result) {
      result =
          await handleProjectAnalyticsTool(
              name,
              args
          );
  }
  if (!result) {
  result =
      await handleUpdateTestCaseTool(
          name,
          args
      );
  }

  if (!result) {
      result =
          await handleImportTestCaseTool(
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
}

server.setRequestHandler(
    CallToolRequestSchema,
    async (request) => {
      const correlationId = generateCorrelationId();
      setCorrelationId(correlationId);

      const {
        name,
        arguments: args
      } = request.params;

      const startTime = Date.now();

      info("MCP Tool Invocation Started", {
        toolName: name,
        arguments: args || {},
      });

      try {
        const result =
            await dispatchTool(name, args);

        const duration = Date.now() - startTime;
        info("MCP Tool Invocation Succeeded", {
          toolName: name,
          durationMs: duration,
        });

        await trackUsage({
            toolName: name,
            status: "SUCCESS",
            requestPayload: args,
            errorLog: null
        });

        return result;

      } catch (error) {
        const duration = Date.now() - startTime;

        let actionableError = error;

        if (error && !error.category) {
          actionableError = getActionableError(error);
        }

        const category = actionableError.category || "UNKNOWN";
        const message = actionableError.message || actionableError.originalMessage || error.message;
        const status = actionableError.status || null;

        const logMeta = {
          toolName: name,
          durationMs: duration,
          category,
          message,
          status,
          stack: error.stack,
        };

        if (category === "AUTH") {
          logError("MCP Tool Authentication Failure", logMeta);
        } else if (category === "TIMEOUT") {
          logError("MCP Tool Timeout Failure", logMeta);
        } else if (category === "NETWORK") {
          logError("MCP Tool Network Failure", logMeta);
        } else {
          logError("MCP Tool Invocation Failed", logMeta);
        }

        await trackUsage({
            toolName: name,
            status: "ERROR",
            requestPayload: args,
            errorLog: message
        });

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: actionableError.actionable || message
            }
          ]
        };
      } finally {
        setCorrelationId(null);
      }
    }
);

async function run() {
  const transport =
      new StdioServerTransport();

  await server.connect(
      transport
  );

  info("QA Touch MCP Server running", {
    version: "1.0.5",
  });
}

run();
