# QA Touch MCP Server

Model Context Protocol Server for QA Touch.

## Installation

npm install

## Run
<pre>
QATOUCH_DOMAIN=yourdomain
QATOUCH_API_TOKEN=yourtoken
</pre>

node src/index.js

## Claude Desktop
<pre>
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
</pre>
