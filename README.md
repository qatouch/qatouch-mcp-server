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

## Example User Prompts

<pre>
<b>Once connected, users can ask:</b>
List all QA Touch projects.
Show test cases from Project PROJECT_KEY.
Get all open defects.
Show test runs from project PROJECT_KEY
Show all modules from project PROJECT_KEY
Show releases from project PROJECT_KEY
Show all requirements from project PROJECT_KEY
</pre>