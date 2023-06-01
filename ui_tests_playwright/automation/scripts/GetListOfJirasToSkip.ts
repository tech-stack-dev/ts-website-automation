import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const searchPattern = /TSWEB-[0-9]{1,8}/;
const jiraBaseUrl = 'https://ts-website.atlassian.net';
const jiraAuth = process.env.JIRA_AUTH_TOKEN!;

async function getTicketStatus(ticketKey: string): Promise<string | null> {
	try {
		const response = await axios.get(`${jiraBaseUrl}/rest/api/3/issue/${ticketKey}`, {
			headers: {
				Authorization: `Basic ${jiraAuth}`,
				Accept: 'application/json',
			},
		});

		const {statusCategory} = response.data.fields.status;
		return statusCategory.name;
	} catch (error) {
		console.error(`Error retrieving status for ticket ${ticketKey}:`, error);
		return null;
	}
}

async function searchStrings(rootDir: string): Promise<string[]> {
	const foundStrings: string[] = [];

	function searchFiles(directory: string) {
		const files = fs.readdirSync(directory);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				searchFiles(filePath);
			} else if (stat.isFile()) {
				const content = fs.readFileSync(filePath, 'utf-8');
				const matches = content.match(searchPattern);

				if (matches) {
					foundStrings.push(...matches);
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

	const ticketStatuses: {[key: string]: string} = {};

	for (const ticket of foundStrings) {
		const status = await getTicketStatus(ticket);
		if (status && !['Ready for QA', 'Testing on Stage', 'UI testing', 'Done', 'Closed'].includes(status)) {
			ticketStatuses[ticket] = status;
		}
	}

	console.log('Tickets with status not in "Ready for QA", "Testing on Stage", "UI testing", "Done", "Closed":');
	console.log(ticketStatuses);
}

run().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
