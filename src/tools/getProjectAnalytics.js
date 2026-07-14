import qaTouchApi from "../api/qatouch.js";

export const projectAnalyticsTools = [
  {
    name: "get_project_analytics",
    description: `
Get complete project analytics dashboard.

Returns:
- Project details
- Test case counts
- Requirement counts
- Requirement coverage
- Test run statistics
- Execution statistics
- Defect statistics
- Release statistics
- User statistics
- Contributor statistics
- Defect assignment statistics
    `,
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "Encrypted Project Key"
        }
      },
      required: ["projectKey"]
    }
  }
];

export async function handleProjectAnalyticsTool(
    name,
    args
) {
  if (name !== "get_project_analytics") {
    return null;
  }

  const response = await qaTouchApi.get(
      `/getProjectAnalytics/${args.projectKey}`
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
            response.data,
            null,
            2
        )
      }
    ]
  };
}