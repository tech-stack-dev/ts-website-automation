import { APIResponse } from '@playwright/test';
import appsetting from '../../../../appsetting.json';
import {jiraClient} from '../../../base/client/JiraClient';

class JiraApiSteps {

	
		private async GetStatusByJiraId(issueId:string):Promise<void>{
			const resp: APIResponse = await (await jiraClient.GetClient()).get(
			`${appsetting.Uri}/issue/${issueId}`
		)
		
		
		console.log(resp.json);
		}
		
		async isIssueBlocked(testname: string): Promise<boolean> {
			const blockingJiras = testname.split("@").filter((tag) =>
			  tag.includes(appsetting.TestBlockedByJiraTag)
			);
		  
			if (blockingJiras.length === 0) {
			  return false;
			}
		  
			for (const jira of blockingJiras) {
			  const jiraNumber = jira.replace(appsetting.TestBlockedByJiraTag, "");
			  const status = await this.GetStatusByJiraId(jiraNumber);
		  
				// if (appsetting.JiraClosedStatuses.includes(status)) {
				// 	return false;
				// }
			}
		  
			return true;
		}	  
	}
	
const jiraApiSteps = new JiraApiSteps();

export {jiraApiSteps};
