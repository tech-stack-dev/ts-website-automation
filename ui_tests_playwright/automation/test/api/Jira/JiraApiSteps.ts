import {expect} from '@playwright/test';
import { ClientsEnum } from '../../../base/client/ClientsEnum';
import RequestOptions from '../../../base/client/RequestOptions';
import ClientProvider from '../../../providers/ClientProvider';
import {responseVariable} from '../../../runtimeVariables/dto/ResponseVariable';
import appsetting from './../../../../appsetting.json';

class JiraApiSteps {

  public async GetStatusByJiraId(
    issueId:string
  ) {
    const client = await ClientProvider.getClient(ClientsEnum.JiraClient);
    responseVariable.value = await client.get(`${appsetting.JiraUrl}/issue/${issueId}`);
    
    console.log(responseVariable.value.json);
    return responseVariable.value.json
    }
      
    async isIssueOpened(testname: string): Promise<boolean> {
      const blockingJiras = testname.split("@").filter((tag) =>
        tag.includes("TSWEB-")
      );
      
      if (blockingJiras.length === 0) {
        return false;
      }
      
      for (const jira of blockingJiras) {
        const jiraNumber = jira.replace(appsetting.TestBlockedByJiraTag, "");
        const status = await this.GetStatusByJiraId(jiraNumber);
      
        // if (appsetting.JiraClosedStatuses.includes(status)) {
        //   return false;
        // }
      }
      
      return true;
    }    
  }
  
const jiraApiSteps = new JiraApiSteps();

export {jiraApiSteps};