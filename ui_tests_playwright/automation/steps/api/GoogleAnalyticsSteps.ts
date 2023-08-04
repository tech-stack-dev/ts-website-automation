import {Locator, expect, test, Request} from '@playwright/test';

import {driver} from '../../base/driver/Driver';
import {slackSteps} from './SlackSteps';
import {slackDtoVariable} from '../../runtimeVariables/dto/SlackDtoVariable';
import {promisify} from 'util';

class GoogleAnalyticsSteps {
	public async checkGoogleAnalytics(
		element: Locator,
		event: string,
		method: string,
		testName: string
	): Promise<void> {
		const wait = promisify(setTimeout);
		const result = await Promise.race([
			element.click(),
			driver.Page.waitForRequest(
				(request: Request) => request.url().includes(event) && request.method() === method
			),
			wait(10000),
		]);
		const test1 = async () => {
			await slackSteps.postMessageInSlackChannel(
				slackDtoVariable.value.tsGoogleAnalyticsId,
				`Test: ${testName}\nEvent: ${event}\nMethod: ${method}\n`
			);
		};
		if (!result) {
			await test1();
			return;
		}
		const request = result as Request;
		const url = request.url();

		if (!url.includes('https://www.google-analytics.com') || !url.includes(event)) {
			await test1();
			return;
		}
	}
}

const googleAnalyticsSteps = new GoogleAnalyticsSteps();
export {googleAnalyticsSteps};
