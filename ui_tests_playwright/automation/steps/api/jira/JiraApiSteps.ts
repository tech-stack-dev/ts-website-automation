import {
	PlaywrightTestArgs,
	PlaywrightTestOptions,
	PlaywrightWorkerArgs,
	PlaywrightWorkerOptions,
	TestType,
} from '@playwright/test';
import appsetting from '../../../../appsetting.json';
import {ClientsEnum} from '../../../base/client/ClientsEnum';
import ClientProvider from '../../../providers/ClientProvider';
import {responseVariable} from '../../../runtimeVariables/dto/ResponseVariable';

class JiraApiSteps {
	public async skipIfTestIsBlockedByJira(
		testName: string,
		test: TestType<
			PlaywrightTestArgs & PlaywrightTestOptions,
			PlaywrightWorkerArgs & PlaywrightWorkerOptions
		>
	): Promise<void> {
		if (await jiraApiSteps.isIssueOpened(testName)) {
			test.skip();
		}
	}

	public async isIssueOpened(testname: string): Promise<boolean> {
		const blockingJiras = testname
			.split('@')
			.filter((tag) => tag.includes('TSWEB-'));

		if (blockingJiras.length === 0) {
			return false;
		}

		for (const jira of blockingJiras) {
			const status = await this.GetStatusByJiraId(jira);

			if (appsetting.JiraClosedStatuses.includes(status)) {
				continue;
			} else {
				return true;
			}
		}
		return false;
	}

	public async GetStatusByJiraId(issueId: string) {
		const client = await ClientProvider.getClient(ClientsEnum.JiraClient);
		responseVariable.value = await client.get(
			`rest/api/3/issue/${issueId}`
		);

		const jsonObj = JSON.parse(
			(await responseVariable.value.body()).toString()
		);
		const status = jsonObj.fields.status.name;
		return status;
	}
}

const jiraApiSteps = new JiraApiSteps();

export {jiraApiSteps};
