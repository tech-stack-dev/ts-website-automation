import { request } from '@playwright/test';
import BaseClient from './BaseClient';
import ContextOptions from './ContextOptions';
import appsetting from '../../../appsetting.json';

class JiraClient extends BaseClient {
	private JClient: BaseClient;

	public async GetClient() {
		if (!jiraClient.JClient){
			const contextOptions = new ContextOptions();
			contextOptions.baseURL =  appsetting.Uri;
			contextOptions.extraHTTPHeaders =  {'Authorization': appsetting.JiraAuthToken}
			jiraClient.JClient = new BaseClient();
			jiraClient.JClient.ClientContext = await request.newContext(contextOptions);
		}
		return this;
	}
}

const jiraClient = new JiraClient();

export {jiraClient};