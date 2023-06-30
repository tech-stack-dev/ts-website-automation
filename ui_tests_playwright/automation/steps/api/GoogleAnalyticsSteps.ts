import { Locator, expect, test, Request } from '@playwright/test';


import { driver } from '../../base/driver/Driver';
import { slackSteps } from './SlackSteps';
import { slackDtoVariable } from '../../runtimeVariables/dto/SlackDtoVariable';

class GoogleAnalyticsSteps {
    public async checkGoogleAnalytics(element: Locator, event: string, method: string, testName: string) {
        try {
            const clickPromise = element.click();
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Timeout exception"));
                }, 5000);
            });

            const racePromise = Promise.race([
                driver.Page.waitForRequest((request: Request) =>
                    request.url().includes(event) &&
                    request.method() === method
                ),
                timeoutPromise
            ]);

            const result = await Promise.race([racePromise, clickPromise]);

            if (result === timeoutPromise) {
                console.warn("Timeout exception");
            } else {
                const request = result as Request;
                expect(request.url()).toContain('https://www.google-analytics.com');
                expect(request.url()).toContain(event);
            }
        } catch (error) {
            await slackSteps.postMessageInSlackChannel(slackDtoVariable.value.tsGoogleAnalyticsId, `Test: ${testName}\nEvent: ${event}\nMethod: ${method}\n`);
        }
    }
}

const googleAnalyticsSteps = new GoogleAnalyticsSteps();
export { googleAnalyticsSteps };
