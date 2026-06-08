# Claude Desktop Setup

This example configures Claude Desktop to run the QA Touch MCP Server through `npx`.

## Configuration File Locations

Windows:

```text
%APPDATA%\Claude\claude_desktop_config.json
```

macOS:

```text
~/Library/Application Support/Claude/claude_desktop_config.json
```

Linux:

```text
~/.config/Claude/claude_desktop_config.json
```

## Example Configuration

```json
{
  "mcpServers": {
    "qatouch": {
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
```

Restart Claude Desktop after saving the file.

## Test Prompts

- List all QA Touch projects.
- List test cases from project `PROJECT_KEY`.
- Search test cases containing "login" in `PROJECT_KEY`.
- Show test runs for project `PROJECT_KEY`.
- Show defects for project `PROJECT_KEY`.
- List requirements from project `PROJECT_KEY`.
