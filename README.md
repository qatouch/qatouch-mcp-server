# QA Touch MCP Server

Model Context Protocol Server for QA Touch.

## Installation

npm install

## Run

QATOUCH_DOMAIN=yourdomain
QATOUCH_API_TOKEN=yourtoken

node src/index.js

## Claude Desktop

{
  "mcpServers": {
    "qatouch-server": {
      "command": "npx",
      "args": [
        "-y",
        "qatouch-mcp-server"
      ],
      "env": {
        "QATOUCH_DOMAIN": "yourdomain",
        "QATOUCH_API_TOKEN": "yourtoken"
      }
    }
  }
}
