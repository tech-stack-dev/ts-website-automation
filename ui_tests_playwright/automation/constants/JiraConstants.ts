export default class JiraConstants {
	static jiraApiUrl = 'https://ts-website.atlassian.net';
	static jiraApiUsername = 'qa_techstack@tech-stack.io';
	static apiKey = process.env.JIRA_AUTH_TOKEN!;
}
