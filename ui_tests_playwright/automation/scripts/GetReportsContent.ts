import * as fs from "fs";
import * as path from "path";

const generateReportLinks = (basePath: string, type: string): string => {
  const typePath = path.join(basePath, "reports", type);

  // Read dates
  const dates = fs
    .readdirSync(typePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dateDirent) => {
      const datePath = path.join(typePath, dateDirent.name);

      // Read IDs within each date
      const ids = fs
        .readdirSync(datePath, { withFileTypes: true })
        .filter((subdirent) => subdirent.isDirectory())
        .map((subdirent) => subdirent.name);

      // Generate links for each ID
      const links = ids.map((id) => {
        return `<p><a class="idLink" href="javascript:void(0);" onclick="toggleId('${type}', '${dateDirent.name}', '${id}')">${id}</a></p>`;
      });

      // Return a string for the date with links
      return `<div class="dateContainer">
                <a class="dateLink" href="javascript:void(0);" onclick="toggleDate('${type}', '${
        dateDirent.name
      }')">${dateDirent.name}</a>
                <div class="idSection" id="${type}${
        dateDirent.name
      }Content" style="display: none;">
                  ${links.join("")}
                </div>
              </div>`;
    });

  return dates.join("\n");
};

// Base path to the reports directory
const basePath: string = path.join(__dirname, "..");

// Generate HTML content for Regression and Pull Requests
const regressionContent: string = generateReportLinks(basePath, "regression");
const pullRequestsContent: string = generateReportLinks(
  basePath,
  "pull-requests"
);

// Write the generated content to an HTML file
const htmlContent: string = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Reports</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 20px;
      color: #333;
      background-image: url(images/lockscreen.png); /* Add the path to your background image */
      background-repeat: no-repeat;
      background-position: center center;
      background-attachment: fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }

    .section {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      background-color: #fff;
    }

    .section h2 {
      cursor: pointer;
      color: #0366d6;
      margin: 0;
    }

    .dateContainer {
      margin-bottom: 5px;
    }

    .dateLink, .idLink {
      text-decoration: none;
      color: #0366d6;
      font-weight: bold;
    }

    .idSection {
      margin-left: 20px;
    }
  </style>
</head>
<body>
  <div class="section">
    <h2 onclick="toggleSection('regression')">Regression Reports</h2>
    <div class="dateSection" id="regressionContent">
      ${regressionContent}
    </div>
  </div>

  <div class="section">
    <h2 onclick="toggleSection('pullRequests')">Pull Requests Reports</h2>
    <div class="dateSection" id="pullRequestsContent">
      ${pullRequestsContent}
    </div>
  </div>

  <script>
    function toggleSection(sectionId) {
      const section = document.getElementById(sectionId + 'Content');
      section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }

    function toggleDate(type, dateId) {
      const dateSection = document.getElementById(type + dateId + 'Content');
      dateSection.style.display = dateSection.style.display === 'none' ? 'block' : 'none';
    }

    function toggleId(type, dateId, id) {
      // Add logic to open index.html in a new window or redirect the current window
      const link = \`ui_tests_playwright/automation/reports/\${type}/\${dateId}/\${id}/index.html\`;
      window.open(link, '_blank'); // Open in a new tab
      // or
      // window.location.href = link; // Redirect the current window
    }
  </script>
</body>
</html>
`;

fs.writeFileSync("index.html", htmlContent, "utf-8");

console.log("HTML file generated successfully.");
