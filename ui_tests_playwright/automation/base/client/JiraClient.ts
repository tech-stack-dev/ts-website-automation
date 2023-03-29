import { APIResponse, request } from '@playwright/test';
import appsetting from '../../../appsetting.json';
import BaseClient from './BaseClient';
import ContextOptions from './ContextOptions';

class JiraClient extends BaseClient {
	private JClient: BaseClient;

	public async GetClient() {
		if (!this.JClient){
			const contextOptions = new ContextOptions();
			contextOptions.baseURL =  appsetting.Uri;
			contextOptions.extraHTTPHeaders =  {'Authorization': appsetting.JiraAuthToken}
			this.JClient = new BaseClient();
			this.JClient.ClientContext = await request.newContext(new ContextOptions());
		}
	
		return this.JClient;
	}

	public async findIssue(issueId:string):Promise<void>{
		const resp: APIResponse = await this.JClient.get(
			`${appsetting.Uri}/issue/${issueId}`
		)
		
		console.log(resp.json);
	}
}

export const jiraClient = new JiraClient();