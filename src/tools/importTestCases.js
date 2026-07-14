import qaTouchApi from "../api/qatouch.js";
import {
  jsonResponse,
  validateRequired
} from "./helpers.js";
import fs from "fs";
import path from "path";
import FormData from "form-data";

export const importTestCaseTools = [
  {
    name: "import_test_cases",
    description: "Import test cases into a QA Touch project using a CSV file",
    inputSchema: {
      type: "object",
      properties: {
        projectKey: {
          type: "string",
          description: "QA Touch Project Key"
        },
        csvFile: {
          type: "string",
          description: "Absolute path of CSV file on local machine"
        }
      },
      required: [
        "projectKey",
        "csvFile"
      ]
    }
  }
];

export async function handleImportTestCaseTool(
    name,
    args
) {
  if (name !== "import_test_cases") return null;

  validateRequired(
      args,
      [
        "projectKey",
        "csvFile"
      ]
  );

  if (!fs.existsSync(args.csvFile)) {
    return jsonResponse({
      success: false,
      message: `File not found: ${args.csvFile}`
    });
  }

  const ext = path.extname(args.csvFile).toLowerCase();
  if (ext !== ".csv") {
    return jsonResponse({
      success: false,
      message: `Invalid file type: ${ext}. Expected .csv file.`
    });
  }

  const form = new FormData();
  form.append("projectKey", args.projectKey);
  form.append("file", fs.createReadStream(args.csvFile), {
    filename: path.basename(args.csvFile)
  });

  try {
    const response = await qaTouchApi.post(
        "/testCase/import",
        form,
        {
          headers: form.getHeaders()
        }
    );

    return jsonResponse(
        response.data
    );
  } catch (error) {
    if (error.response) {
      const message = typeof error.response.data === "string"
        ? error.response.data
        : JSON.stringify(error.response.data);
      return jsonResponse({
        success: false,
        message
      });
    }

    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}
