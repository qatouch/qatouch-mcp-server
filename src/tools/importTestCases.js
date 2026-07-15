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
        filePath: {
          type: "string",
          description: "Absolute path of CSV file on local machine"
        }
      },
      required: [
        "projectKey",
        "filePath"
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
        "filePath"
      ]
  );

  if (!fs.existsSync(args.filePath)) {
    throw new Error(
        `File not found: ${args.filePath}`
    );
  }

  const ext = path.extname(args.filePath).toLowerCase();
  if (ext !== ".csv") {
    throw new Error(
        `Invalid file type: ${ext}. Expected .csv file.`
    );
  }

  const form = new FormData();
  form.append("projectKey", args.projectKey);
  form.append("file", fs.createReadStream(args.filePath), {
    filename: path.basename(args.filePath)
  });

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
}
