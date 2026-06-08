# Contributing

Thank you for your interest in contributing to the QA Touch MCP Server.

## Development Workflow

1. Fork the repository.
2. Clone your fork locally.
3. Install dependencies:

```bash
npm install
```

4. Create a feature branch:

```bash
git checkout -b feature/short-description
```

5. Make focused changes.
6. Run the server locally when applicable:

```bash
QATOUCH_DOMAIN=yourdomain QATOUCH_API_TOKEN=yourtoken npm start
```

7. Commit your changes and open a pull request.

## Coding Standards

- Preserve the existing MCP architecture.
- Keep one MCP tool per file in `src/tools` when adding new tools.
- Export a `*Tools` array and matching `handle*Tool` function from each tool file.
- Register new tools in `src/index.js`.
- Reuse `src/api/qatouch.js` for QA Touch API requests.
- Validate required parameters before making API calls.
- Return MCP-compatible JSON text responses.
- Keep tool descriptions clear and useful for AI assistants.
- Avoid unrelated refactors in feature pull requests.

## Commit Messages

Use concise, descriptive commit messages:

```text
feat: add requirement search tool
fix: handle missing project key validation
docs: update Claude Desktop setup
chore: refresh package metadata
```

Recommended prefixes:

- `feat:` for new tools or capabilities
- `fix:` for bug fixes
- `docs:` for documentation
- `chore:` for maintenance
- `refactor:` for behavior-preserving code changes

## Pull Requests

Pull requests should include:

- A clear summary of the change.
- The reason the change is needed.
- Any new or changed MCP tools.
- Notes about QA Touch API endpoints used.
- Manual verification steps.
- Screenshots or logs when relevant.

## Reporting Issues

Use the issue templates for bug reports and feature requests. Include enough detail for maintainers to reproduce the issue or understand the requested workflow.
