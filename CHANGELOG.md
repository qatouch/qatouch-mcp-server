# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows semantic versioning.

## [1.0.2] - 2026-06-07

### Added

- Project count and project creation tools.
- Test case count, search, exploratory creation, text-template creation, and bulk creation tools.
- Module count, search, and creation tools.
- Release count, search, and creation tools.
- Requirement count, search, requirement document listing, requirement document creation, and requirement creation tools.
- Defect count, search, creation, status, severity, issue type, and environment tools.
- Test run count, result listing, result history, status listing, available user listing, single result update, and batch result update tools.
- Project-wide search across test cases, modules, requirements, defects, and releases.
- Workspace listing tool.
- End-user prompt guide in `how_to_use.txt`.

### Changed

- Expanded MCP tool registration to cover the current QA Touch API surface implemented in this repository.
- Improved response normalization and validation helpers for new tools.

## [1.0.0] - 2026-06-07

### Added

- Initial QA Touch MCP server implementation.
- MCP stdio transport integration using `@modelcontextprotocol/sdk`.
- QA Touch API client using `axios`.
- Environment validation for `QATOUCH_API_TOKEN` and `QATOUCH_DOMAIN`.
- Project listing tools.
- Test case listing and creation tools.
- Test run listing tools.
- Defect listing tools.
- Module listing tools.
- Release listing tools.
- Requirement listing tools.
- npm package binary entry point.
