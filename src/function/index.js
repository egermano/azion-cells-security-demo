// Demonstração de Segurança do Azion Cells
import fs from "node:fs";

async function handleRequest(request, args) {
  const securityTests = [];

  // Test 1: fs is SAFE and LIMITED

  // ❌ Try to access outside the sandbox
  try {
    fs.readFileSync("/etc/passwd", "utf8");
  } catch (e) {
    securityTests.push({
      test: "fs outside the sandbox",
      status: "blocked",
      error: e.message,
      note: "Access denied - fs only works inside the sandbox",
    });
  }

  // Test 2: Try to access process/system
  try {
    process.exit(1); // ❌ process does not exist
  } catch (e) {
    securityTests.push({
      test: "process.exit",
      status: "blocked",
      error: "process is not defined",
    });
  }

  // Test 3: Try to require dangerous modules
  try {
    const child_process = require("child_process"); // ❌ child_process does not exist
    const ls = child_process.exec("ls -lh /usr");
    ls.on("error", (e) => {
      securityTests.push({
        test: "child_process",
        status: "blocked",
        error: "child_process do not work in sandbox",
      });
    });
  } catch (e) {
    securityTests.push({
      test: "child_process",
      status: "blocked",
      error: "child_process do not work in sandbox",
    });
  }

  // APIs Web Standard that WORK ✅
  const response = await fetch("https://api.github.com/orgs/aziontech");
  const githubData = await response.json();

  return new Response(
    JSON.stringify({
      message: "Azion Cells Security Demo",
      security_tests: securityTests,
      working_apis: {
        fetch: `GitHub API returned, aziontech has ${githubData.public_repos} repos`,
        crypto: crypto.randomUUID(),
        edge_storage: "Through `fs` API works but limited to sandbox secure",
      },
    }),
    {
      headers: { "content-type": "application/json;charset=UTF-8" },
    }
  );
}

export { handleRequest };
