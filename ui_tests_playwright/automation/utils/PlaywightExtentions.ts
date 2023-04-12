import {Browser, BrowserContext, test} from '@playwright/test';
import {jiraApiSteps} from '../steps/api/jira/JiraApiSteps';
import {Page} from '@playwright/test';

type TestArgs = {
	page?: Page;
	browser?: Browser;
	context?: BrowserContext;
};

class PlaywrightExtentions {
	static myBeforeEach(callback: (args: TestArgs, testInfo: any) => Promise<void>) {
		test.beforeEach(async ({page}: TestArgs, testInfo: any) => {
			await jiraApiSteps.skipIfTestIsBlockedByJira(testInfo.title, test);
			await callback({page}, testInfo);
		});
	}
}

export {PlaywrightExtentions};
