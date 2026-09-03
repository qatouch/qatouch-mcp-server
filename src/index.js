#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { trackUsage } from "./helpers/analytics.js";
import { getActionableError } from "./helpers/errors.js";

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
} from "./tools/createBulkTestCases.js";

import {
    importTestCaseTools,
    handleImportTestCaseTool
} from "./tools/importTestCases.js";

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
     createTestRunWithModulesTools,
     handleCreateTestRunWithModulesTool
} from "./tools/createTestRunWithModules.js";

import {
       updateTestCaseTools,
       handleUpdateTestCaseTool
     } from "./tools/updateTestCase.js";

import {
     playwrightScriptTools,
     handlePlaywrightScriptTool
   } from "./tools/playwrightScripts.js";

import {
     testResultReportTools,
     handleTestResultReportTool
   } from "./tools/getTestResultStatistics.js";

import {
     testCaseReportTools,
     handleTestCaseReportTool
   } from "./tools/getTestCaseStatistics.js";

import {
     projectReportTools,
     handleProjectReportTool
   } from "./tools/getProjectInsights.js";

import {
     moduleReportTools,
     handleModuleReportTool
   } from "./tools/getModuleStatistics.js";

import {
     requirementReportTools,
     handleRequirementReportTool
   } from "./tools/getRequirementStatistics.js";

import {
     issueReportTools,
     handleIssueReportTool
   } from "./tools/getIssueStatistics.js";

const toolHandlers = [
  handleProjectTool,
  handleCountAllProjectTool,
  handleCreateProjectTool,
  handleTestCaseTool,
  handleCountTestCaseTool,
  handleDefectTool,
  handleListDefectStatusTool,
  handleListDefectSeverityTool,
  handleListDefectIssueTypeTool,
  handleListDefectEnvironmentTool,
  handleCountDefectTool,
  handleCreateDefectTool,
  handleModuleTool,
  handleCountModuleTool,
  handleCreateModuleTool,
  handleCreateTestCaseTool,
  handleCreateBulkTestCaseTool,
  handleCreateExploratoryTestCaseTool,
  handleCreateTextTestCaseTool,
  handleImportTestCaseTool,
  handleTestRunTool,
  handleCountTestRunTool,
  handleListTestRunResultTool,
  handleListTestRunResultHistoryTool,
  handleListTestRunStatusTool,
  handleUpdateTestRunResultStatusTool,
  handleListTestRunAvailableUserTool,
  handleUpdateTestRunResultsByCodeTool,
  handleCreateTestRunWithModulesTool,
  handleReleaseTool,
  handleCountReleaseTool,
  handleCreateReleaseTool,
  handleRequirementTool,
  handleCountRequirementTool,
  handleListRequirementDocumentTool,
  handleCreateRequirementDocumentTool,
  handleCreateRequirementTool,
  handleListWorkspaceTool,
  handleSearchTestCaseTool,
  handleSearchModuleTool,
  handleSearchRequirementTool,
  handleSearchDefectTool,
  handleSearchReleaseTool,
  handleSearchProjectTool,
  handleProjectAnalyticsTool,
  handleUpdateTestCaseTool,
  handlePlaywrightScriptTool,
  handleTestResultReportTool,
  handleTestCaseReportTool,
  handleProjectReportTool,
  handleModuleReportTool,
  handleRequirementReportTool,
  handleIssueReportTool
];

const server = new Server(
    {
      name: "qatouch-mcp-server",
      version: "1.1.7"
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
            ...createTestRunWithModulesTools,
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
            ...importTestCaseTools,
            ...searchTestCaseTools,
            ...searchModuleTools,
            ...searchRequirementTools,
            ...searchDefectTools,
            ...searchReleaseTools,
            ...searchProjectTools,
            ...projectAnalyticsTools,
             ...updateTestCaseTools,
             ...playwrightScriptTools,
             ...testResultReportTools,
             ...testCaseReportTools,
             ...projectReportTools,
             ...moduleReportTools,
             ...requirementReportTools,
             ...issueReportTools,
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

      const startTime = Date.now();
      const correlationId = `req_${startTime}_${Math.random().toString(36).slice(2, 9)}`;

      try {
        let result = null;

        for (const handler of toolHandlers) {
          result = await handler(name, args);
          if (result) {
            break;
          }
        }

        if (!result) {
          throw new Error(
              `Unknown tool: ${name}`
          );
        }

        const durationMs = Date.now() - startTime;

        try {
          await trackUsage({
              toolName: name,
              status: "SUCCESS",
              durationMs
          });
        } catch (analyticsError) {
          console.error("Analytics tracking failed:", analyticsError);
        }

        console.error(
            JSON.stringify({
                timestamp: new Date().toISOString(),
                correlationId,
                toolName: name,
                status: "SUCCESS",
                durationMs
            })
        );

        return result;

      } catch (error) {
        const durationMs = Date.now() - startTime;
        const classified = getActionableError(error);

        try {
          await trackUsage({
              toolName: name,
              status: "ERROR",
              durationMs,
              errorLog: classified.originalMessage
          });
        } catch (analyticsError) {
          console.error("Analytics tracking failed:", analyticsError);
        }

        console.error(
            JSON.stringify({
                timestamp: new Date().toISOString(),
                correlationId,
                toolName: name,
                status: "ERROR",
                durationMs,
                error: classified.originalMessage,
                category: classified.category
            })
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: classified.actionable
            }
          ]
        };
      }
    }
);

async function run() {
  try {
    const transport =
        new StdioServerTransport();

    await server.connect(
        transport
    );
  } catch (error) {
    console.error("FATAL: Failed to start MCP server:", error);
    process.exit(1);
  }
}

async function main() {
  await run();

  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await server.close();
    process.exit(0);
  });
}

(async () => {
  await main();
})();
