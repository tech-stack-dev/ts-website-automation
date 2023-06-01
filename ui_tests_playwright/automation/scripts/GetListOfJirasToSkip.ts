import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const jiraBaseUrl = 'https://ts-website.atlassian.net';
const token = process.env.JIRA_AUTH_TOKEN;
const jiraUsername = 'qa_techstack@tech-stack.io';

async function getTicketStatus(ticketKey: string): Promise<string | null> {
  try {
    const authToken = Buffer.from(`${jiraUsername}:${token}`).toString('base64');
    const response = await axios.get(`${jiraBaseUrl}/rest/api/3/issue/${ticketKey}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });

    const { statusCategory } = response.data.fields.status;
    return statusCategory.name;
  } catch (error) {
    console.error(`Error retrieving status for ticket ${ticketKey}:`, error);
    return null;
  }
}

async function searchStrings(rootDir: string): Promise<Set<string>> {
  const foundStrings: Set<string> = new Set();

  function searchFiles(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        searchFiles(filePath);
      } else if (stat.isFile()) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.matchAll(/TSWEB-[0-9]{1,8}/g);

        for (const match of matches) {
          foundStrings.add(match[0]);
        }
      }
    }
  }

  searchFiles(rootDir);
  return foundStrings;
}

async function run() {
  const rootDirectory = process.cwd();
  const foundStrings = await searchStrings(rootDirectory);

  const ticketStatuses: string[] = [];

  for (const ticket of foundStrings) {
    const status = await getTicketStatus(ticket);
    if (status && !['Ready for QA', 'Testing on Stage', 'UI testing', 'Done', 'Closed'].includes(status)) {
      ticketStatuses.push(ticket);
    }
  }

  fs.writeFileSync('ticketStatuses.json', JSON.stringify(ticketStatuses));
}

run().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
