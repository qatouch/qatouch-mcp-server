# QA Touch MCP Server

Official Model Context Protocol (MCP) server for QA Touch.

QA Touch is a modern test management platform for organizing projects, test cases, test runs, execution results, defects, requirements, releases, and QA reporting. This MCP server lets MCP-compatible AI assistants interact with QA Touch through a secure, tool-based interface.

## Features

- List and count QA Touch projects
- Create projects
- List and search test cases
- Create structured, bulk, exploratory, and text-template test cases
- List, count, search, and create modules
- List, count, search, and create releases/milestones
- List, count, search, and create requirements and requirement documents
- List, count, search, and create defects
- List defect statuses, severities, issue types, and environments
- List test runs, test run results, result history, and available statuses
- Update single or batch test run result statuses
- List users available for test execution
- Search across project test cases, modules, requirements, defects, and releases
- List QA Touch workspaces

## Requirements

- Node.js 18+
- npm
- QA Touch API token
- QA Touch domain

## Installation

Run directly with `npx`:

```bash
npx -y qatouch-mcp-server
```

Or install globally:

```bash
npm install -g qatouch-mcp-server
qatouch-mcp-server
```

The server requires these environment variables:

```bash
QATOUCH_DOMAIN=yourdomain
QATOUCH_API_TOKEN=yourtoken
```

## Claude Desktop Setup

Add this server to your Claude Desktop MCP configuration.

Windows config location:

```text
%APPDATA%\Claude\claude_desktop_config.json
```

macOS config location:

```text
~/Library/Application Support/Claude/claude_desktop_config.json
```

Linux config location:

```text
~/.config/Claude/claude_desktop_config.json
```

Configuration:

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

## Available Tools

| Tool | Description |
| ---- | ----------- |
| `count_all_projects` | Get the total number of QA Touch projects available for the domain |
| `count_defects` | Get the total number of defects available for a QA Touch project |
| `count_modules` | Get the total number of modules available for a QA Touch project |
| `count_releases` | Get the total number of releases available for a QA Touch project |
| `count_requirements` | Get the total number of requirements available for a QA Touch project |
| `count_test_cases` | Get the total number of test cases available for a QA Touch project |
| `count_test_runs` | Get the total number of test runs available for a QA Touch project |
| `create_bulk_test_cases` | Create multiple QA Touch test cases from a scenario |
| `create_defect` | Create a QA Touch defect with priority and issue summary |
| `create_exploratory_test_case` | Create a QA Touch exploratory-session test case without structured steps |
| `create_module` | Create a module in a QA Touch project |
| `create_project` | Create a new QA Touch project |
| `create_release` | Create a new release or milestone in a QA Touch project |
| `create_requirement` | Create a requirement in a QA Touch project requirement document |
| `create_requirement_document` | Create a requirement document in a QA Touch project |
| `create_test_case` | Create a QA Touch test case with structured steps |
| `create_text_test_case` | Create a QA Touch test case using the text template endpoint |
| `list_defect_environments` | List all environments available for QA Touch defects |
| `list_defect_issue_types` | List all issue types available for QA Touch defects |
| `list_defect_severities` | List all severities available for QA Touch defects |
| `list_defect_statuses` | List all statuses available for QA Touch defects |
| `list_defects` | Get all defects from a project |
| `list_modules` | Get all modules from a project |
| `list_projects` | Retrieve all QA Touch projects |
| `list_releases` | Get all releases from a project |
| `list_requirement_documents` | List requirement documents for a QA Touch project |
| `list_requirements` | Get all requirements from a project |
| `list_test_cases` | Get all test cases from a project |
| `list_test_run_available_users` | List users available for testing in a QA Touch project |
| `list_test_run_result_history` | List history for a QA Touch test run result |
| `list_test_run_results` | List all results for a QA Touch test run |
| `list_test_run_statuses` | List all statuses available for QA Touch test runs |
| `list_test_runs` | Get all test runs from a project |
| `list_workspace` | List all QA Touch workspaces available for the domain |
| `search_defects` | Fetch defects for a project and search issue summary |
| `search_modules` | Fetch modules for a project and search module name |
| `search_project` | Search test cases, modules, requirements, defects, and releases in a project |
| `search_releases` | Fetch releases for a project and search milestone name |
| `search_requirements` | Fetch requirements for a project and search title and description |
| `search_test_cases` | Fetch all test cases for a project and search test case title and description |
| `update_test_run_result_status` | Update the status of a single QA Touch test run result |
| `update_test_run_results_by_code` | Batch update QA Touch test run result statuses by test case code |

## Example Prompts

- List all QA Touch projects
- Count all QA Touch projects
- Create a project named Mobile App Regression
- Show test cases from project ABC
- Search test cases containing "login" in project ABC
- Create a login test case in project ABC under section AUTH
- Create 8 regression test cases for checkout in project ABC under section CHECKOUT
- List modules from project ABC
- Create a module named Payment Gateway in project ABC
- List releases from project ABC
- Create release "June Regression" in project ABC
- List requirements from project ABC
- Search requirements containing "password reset" in project ABC
- List requirement documents in project ABC
- Create a requirement document named Login Requirements for release REL1 in project ABC
- Create a requirement for valid login in document DOC1
- List defects from project ABC
- Show high priority defects in project ABC
- Search defects containing "timeout" in project ABC
- Create a high priority defect in project ABC for checkout payment timeout
- List test runs from project ABC
- Show test run results for test run RUN1 in project ABC
- Show result history for result RES1 in test run RUN1
- List available test run statuses
- Mark result RES1 as failed in test run RUN1 for project ABC
- Batch update TC-101 as passed and TC-102 as blocked in test run RUN1
- List testers available for project ABC
- Search project ABC for "login"
- Generate a QA status report for project ABC
- Identify unexecuted test cases in test run RUN1
- For more📖 Prompt Examples: [how_to_use.txt](./how_to_use.txt)

## Development

Install dependencies:

```bash
npm install
```

Run the MCP server locally:

```bash
npm start
```

Environment variables are required when running locally:

```bash
QATOUCH_DOMAIN=yourdomain QATOUCH_API_TOKEN=yourtoken npm start
```

This repository currently defines only the `start` script in `package.json`.

## Project Structure

```text
src/
  api/          QA Touch API client
  config/       Environment variable validation
  tools/        MCP tool definitions and handlers
  index.js      MCP server entry point and tool registration
examples/       Prompt and client setup examples
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, coding standards, and pull request guidance.

## License

This project is licensed under the [MIT License](LICENSE).
