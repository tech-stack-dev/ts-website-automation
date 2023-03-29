import appsetting from '../../../../appsetting.json';
import ContextOptions from '../../../base/client/ContextOptions';
import {jiraClient} from '../../../base/client/JiraClient';

class JiraApiSteps {
		private async getCurrentIssueStatus(issueNumber: string): Promise<string> {
			
			return jiraClient.findIssue(issueNumber)
				.then(function (issue) {
					console.log('Status: ' + issue.fields.status.name);
					return issue.fields.status.name;
				})
				.catch(function (err) {
					console.log(err);
				});
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
			  const status = await this.getCurrentIssueStatus(jiraNumber);
		  
				if (appsetting.JiraClosedStatuses.includes(status)) {
					return false;
				}
			}
		  
			return true;
		}	  
	}
	
const jiraApiSteps = new JiraApiSteps();

export {jiraApiSteps};
