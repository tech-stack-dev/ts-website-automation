import { Locator, Request, expect } from '@playwright/test';
import { driver } from '../../base/driver/Driver';
import ExternalSourceLinks from '../../preconditionsData/Links/ExternalSourceLinks';
import { slackDtoVariable } from '../../runtimeVariables/dto/SlackDtoVariable';
import { slackSteps } from './SlackSteps';

class GoogleAnalyticsSteps {
	public async checkGoogleAnalytics(
		element: Locator,
		event: string,
		testName: string
	): Promise<void> {
		const method = 'GET';
		const postData = `Event: ${event}\nMethod: ${method}`;
		const result = await Promise.race([
			element.click(),
			driver.Page.waitForRequest(
				(request: Request) =>
					request.url().includes(ExternalSourceLinks.GoogleAnalytics) &&
					request.url().includes(event) &&
					request.method() === method,
				{timeout: 10000}
			)]);

		try {
			expect(result, `Event was not found\n${postData}`).toBeTruthy();
		} catch (error) {
			await slackSteps.postMessageInSlackChannel(
				slackDtoVariable.value.tsGoogleAnalyticsId,
				`Test: ${testName}\n${postData}`
			);
			throw error;
		}
	}
}

const googleAnalyticsSteps = new GoogleAnalyticsSteps();
export { googleAnalyticsSteps };

