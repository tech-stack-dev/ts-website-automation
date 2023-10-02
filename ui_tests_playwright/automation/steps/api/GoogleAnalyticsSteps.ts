import { Locator, Request } from '@playwright/test';
import { promisify } from 'util';
import { driver } from '../../base/driver/Driver';
import { HttpMethod } from '../../enum/HttpMethodEnum';
import ExternalSourceLinks from '../../preconditionsData/Links/ExternalSourceLinks';
import { slackDtoVariable } from '../../runtimeVariables/dto/SlackDtoVariable';
import { slackSteps } from './SlackSteps';

class GoogleAnalyticsSteps {
	public async checkGoogleAnalytics(
		element: Locator,
		event: string,
		testName: string,
		method?: string
	): Promise<void> {
		method = method || HttpMethod.GET;
		const wait = promisify(setTimeout);
		const result = await Promise.race([
			element.click(),
			driver.Page.waitForRequest(
				(request: Request) => request.url().includes(event) && request.method() === method
			),
			wait(10000),
		]);
		const postMessage = async () => {
			await slackSteps.postMessageInSlackChannel(
				slackDtoVariable.value.tsGoogleAnalyticsId,
				`Test: ${testName}\nEvent: ${event}\nMethod: ${method}\n`
			);
		};
		if (!result) {
			await postMessage();
			return;
		}
		const request = result as Request;
		const url = request.url();

		if (!url.includes(ExternalSourceLinks.GoogleAnalytics) || !url.includes(event)) {
			await postMessage();
			return;
		}
	}
}

const googleAnalyticsSteps = new GoogleAnalyticsSteps();
export { googleAnalyticsSteps };

