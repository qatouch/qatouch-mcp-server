#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema 
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

// 1. Retrieve QA Touch credentials from environment variables
const QATOUCH_API_TOKEN = process.env.QATOUCH_API_TOKEN;
const QATOUCH_DOMAIN = process.env.QATOUCH_DOMAIN; // e.g., "yourcompany" (.qatouch.com)

if (!QATOUCH_API_TOKEN || !QATOUCH_DOMAIN) {
  console.error("Error: QATOUCH_API_TOKEN and QATOUCH_DOMAIN environment variables are required.");
  process.exit(1);
}

// Set up Axios instance for QA Touch API
const qaTouchApi = axios.create({
  baseURL: `https://api.qatouch.com/api/v1`,
  headers: {
    "api-token": QATOUCH_API_TOKEN,
    "domain": QATOUCH_DOMAIN,
    "Content-Type": "application/json"
  }
});

// 2. Initialize the MCP Server
const server = new Server(
  {
    name: "qatouch-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 3. Define available tools for Claude
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "Retrieve a list of all software testing projects from QA Touch.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_test_case",
        description: "Get test case inside a specific QA Touch project.",
        inputSchema: {
          type: "object",
          properties: {
            projectKey: {
              type: "string",
              description: "The unique key/ID of the QA Touch project."
            },
            title: {
              type: "string",
              description: "The title of the test case."
            },
            description: {
              type: "string",
              description: "Detailed steps or summary of the test case."
            }
          },
          required: ["projectKey", "title"],
        },
      },
    ],
  };
});

// 4. Handle tool execution requests from Claude
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "list_projects") {
      // Endpoint syntax depends on QA Touch API v1 documentation specifications
      const response = await qaTouchApi.get("/getAllProjects");
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } 
    
    if (name === "get_test_case") {
      const response = await qaTouchApi.post("/testcase/add", {
        project_key: args.projectKey,
        title: args.title,
        description: args.description || ""
      });
      return {
        content: [{ type: "text", text: `Test case created successfully: ${JSON.stringify(response.data)}` }],
      };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: error.response?.data ? JSON.stringify(error.response.data) : error.message }],
    };
  }
});

// 5. Run the server using stdio transport layer
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("QA Touch MCP Server running on stdio");
}

run();