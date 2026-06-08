# Basic Prompts

Use these prompts with any MCP-compatible AI assistant connected to the QA Touch MCP Server.

## Projects

- List all projects.
- Show all QA Touch projects.
- Get project details for `PROJECT_KEY`.
- Count all projects.

Related tools:

- `list_projects`
- `count_all_projects`

## Test Cases

- List test cases from project `PROJECT_KEY`.
- Show test cases in `PROJECT_KEY`.
- Search test cases containing "login" in `PROJECT_KEY`.
- Show test case `TC-123` in `PROJECT_KEY`.
- Create a login test case in project `PROJECT_KEY` under section `SECTION_KEY`.
- Create 8 checkout regression test cases in project `PROJECT_KEY` under section `SECTION_KEY`.

Related tools:

- `list_test_cases`
- `search_test_cases`
- `create_test_case`
- `create_bulk_test_cases`
- `create_exploratory_test_case`
- `create_text_test_case`

## Test Runs

- Show test runs for project `PROJECT_KEY`.
- Show test run results for `TEST_RUN_KEY` in project `PROJECT_KEY`.
- Show failed test cases from test run `TEST_RUN_KEY`.
- List available test run statuses.
- Mark result `RESULT_KEY` as failed in test run `TEST_RUN_KEY`.

Related tools:

- `list_test_runs`
- `list_test_run_results`
- `list_test_run_statuses`
- `update_test_run_result_status`

## Defects

- Show defects for project `PROJECT_KEY`.
- Show high priority defects in `PROJECT_KEY`.
- Search defects containing "payment failure" in `PROJECT_KEY`.
- Create a high priority defect in `PROJECT_KEY` for checkout timeout.

Related tools:

- `list_defects`
- `search_defects`
- `create_defect`

## Requirements

- List requirements from project `PROJECT_KEY`.
- Search requirements containing "login" in `PROJECT_KEY`.
- List requirement documents in `PROJECT_KEY`.
- Create a requirement document named "Login Requirements" for release `RELEASE_KEY`.

Related tools:

- `list_requirements`
- `search_requirements`
- `list_requirement_documents`
- `create_requirement_document`
