# Use Cases

## Project Discovery

Prompts:

- List all projects.
- Get project details for `PROJECT_KEY`.
- List modules from project `PROJECT_KEY`.
- List releases from project `PROJECT_KEY`.

Useful tools:

- `list_projects`
- `list_modules`
- `list_releases`
- `search_project`

## Test Case Management

Prompts:

- List test cases from project `PROJECT_KEY`.
- Search test cases containing "login" in `PROJECT_KEY`.
- Create a test case in project `PROJECT_KEY` under section `SECTION_KEY`.
- Create 8 regression test cases for checkout in project `PROJECT_KEY`.

Useful tools:

- `list_test_cases`
- `search_test_cases`
- `create_test_case`
- `create_bulk_test_cases`

## Test Execution Review

Prompts:

- Show test runs for project `PROJECT_KEY`.
- Show test run results for `TEST_RUN_KEY`.
- Show failed test cases from `TEST_RUN_KEY`.
- Show result history for `RESULT_KEY`.
- Show test execution statistics for `PROJECT_KEY`.

Useful tools:

- `list_test_runs`
- `list_test_run_results`
- `list_test_run_result_history`
- `count_test_runs`

## Defect Triage

Prompts:

- Show defects for project `PROJECT_KEY`.
- Show high priority defects in `PROJECT_KEY`.
- Search defects containing "timeout" in `PROJECT_KEY`.
- Create a defect for payment timeout in `PROJECT_KEY`.

Useful tools:

- `list_defects`
- `search_defects`
- `create_defect`
- `list_defect_statuses`
- `list_defect_severities`

## Requirements Coverage

Prompts:

- List requirements from project `PROJECT_KEY`.
- Search requirements containing "checkout" in `PROJECT_KEY`.
- List requirement documents in `PROJECT_KEY`.
- Compare requirements against test cases and identify gaps.

Useful tools:

- `list_requirements`
- `search_requirements`
- `list_requirement_documents`
- `search_project`

## Release Readiness

Prompts:

- List releases from project `PROJECT_KEY`.
- Search releases containing "June" in `PROJECT_KEY`.
- Generate a release readiness summary for `PROJECT_KEY`.
- Summarize failed tests, blocked tests, and high priority defects.

Useful tools:

- `list_releases`
- `search_releases`
- `list_test_runs`
- `list_test_run_results`
- `list_defects`
