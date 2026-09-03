export function validateRequired(
    args,
    fields
) {
  const missing =
      fields.filter(
          field => !args || !args[field]
      );

  if (missing.length) {
    throw new Error(
        `Missing required parameter(s): ${missing.join(", ")}`
    );
  }
}

export function jsonResponse(data) {
  let text;
  try {
    text = JSON.stringify(
        data === undefined ? {} : data,
        null,
        2
    );
  } catch (error) {
    text = JSON.stringify({
      error: "Failed to serialize QA Touch response",
      details: error.message
    });
  }

  if (typeof text !== "string") {
    text = JSON.stringify({});
  }

  return {
    content: [
      {
        type: "text",
        text
      }
    ]
  };
}

export function validateApiResponse(response) {
  if (!response || response.data === undefined || response.data === null) {
    throw new Error(
        "QA Touch API returned an empty response. This may indicate a timeout, rate limit, or server-side issue."
    );
  }

  if (typeof response.data === "string") {
    const trimmed = response.data.trim();

    if (trimmed.startsWith("<") || trimmed.startsWith("<!")) {
      throw new Error(
          "QA Touch API returned an HTML response instead of JSON. The API may be returning an error page."
      );
    }

    try {
      JSON.parse(trimmed);
    } catch (e) {
      throw new Error(
          "QA Touch API returned a non-JSON response: " + trimmed.substring(0, 200)
      );
    }
  }
}

export function extractRecords(data) {
  if (Array.isArray(data)) {
    return data;
  }

  const nestedData =
      data && data.data;

  const candidates = [
    nestedData,
    nestedData && nestedData.data,
    data && data.projects,
    nestedData && nestedData.projects,
    data && data.test_cases,
    nestedData && nestedData.test_cases,
    data && data.testCases,
    nestedData && nestedData.testCases,
    data && data.modules,
    nestedData && nestedData.modules,
    data && data.requirements,
    nestedData && nestedData.requirements,
    data && data.defects,
    nestedData && nestedData.defects,
    data && data.milestones,
    nestedData && nestedData.milestones,
    data && data.releases,
    nestedData && nestedData.releases,
    data && data.results,
    nestedData && nestedData.results
  ];

  const records =
      candidates.find(
          candidate => Array.isArray(candidate)
      );

  if (records) {
    return records;
  }

  const objectRecords =
      candidates.find(
          candidate =>
              candidate &&
              typeof candidate === "object" &&
              Object.values(candidate).every(
                  value =>
                      value &&
                      typeof value === "object"
              )
      );

  return objectRecords
      ? Object.values(objectRecords)
      : [];
}

function valueForPath(
    record,
    path
) {
  return path
      .split(".")
      .reduce(
          (value, key) => value && value[key],
          record
      );
}

export function filterRecords(
    records,
    query,
    fields
) {
  const normalizedQuery =
      String(query || "")
          .trim()
          .toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return records.filter(
      record =>
          fields.some(
              field => {
                const value =
                    valueForPath(
                        record,
                        field
                    );

                return String(value || "")
                    .toLowerCase()
                    .includes(normalizedQuery);
              }
          )
  );
}

export function normalizedSearchResponse(
    query,
    records
) {
  return {
    query,
    total: records.length,
    results: records
  };
}
