// global-setup.ts/js
import { FullConfig, test, suite } from '@playwright/test';
import { jiraApiSteps } from './automation/steps/api/jira/JiraApiSteps';

async function globalSetup(config: FullConfig) {
	const testList:string[]=[];
  const tagsSet= testList.filter(word => word.includes("TSWEB-"));
  const skipTagList=[];
  for (const ticket of tagsSet) {
    if(await jiraApiSteps.isIssueOpened(ticket)){
        skipTagList.push(ticket);
    }
    return skipTagList;
  }

}

export default globalSetup;