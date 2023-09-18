import {Locator, Request, expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import ExternalSourceLinks from '../../preconditionsData/Links/ExternalSourceLinks';
import {slackDtoVariable} from '../../runtimeVariables/dto/SlackDtoVariable';
import {slackSteps} from './SlackSteps';

class GoogleAnalyticsSteps {
	public async checkGoogleAnalytics(
		element: Locator,
		event: string,
		method: string,
		testName: string
	): Promise<void> {
		const postData = `Event: ${event}\nMethod: ${method}`;
		element.click();
		let request: Request | null = null;

		try {
			request = await driver.Page.waitForRequest(
				(request: Request) =>
					request.url().includes(ExternalSourceLinks.GoogleAnalytics) &&
					request.url().includes(event) &&
					request.method() === method,
				{timeout: 10000}
			);
		} catch (error) {
			await slackSteps.postMessageInSlackChannel(
				slackDtoVariable.value.tsGoogleAnalyticsId,
				`Test: ${testName}\n${postData}`
			);
		}

		expect(request, `Event was not found\n${postData}`).toBeTruthy();
	}
}

const googleAnalyticsSteps = new GoogleAnalyticsSteps();
export {googleAnalyticsSteps};
