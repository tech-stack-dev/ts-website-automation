import { driver } from '../../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../../providers/UrlProvider';
import { careerSteps, expect, test } from '../../../../../fixtures/DesktopMobileSetup';
import { playwrightUtils } from '../../../../../utils/PlaywrightUtils';
import { qase } from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(
	qase(4863, `Check that all tags dropdowns are expanded by default @desktop @mobile @Regression @FilterBlock @TSWEB-145`),
	async () => {
		const dropdowns: string[] = ['Directions', 'Seniority levels', 'Technology stack', 'Tags'];

		for (const dropdown of dropdowns) {
			const expandedState = careerSteps.dropdownIsExpanded(dropdown);
			await playwrightUtils.expectWithRetries(async () => {
				expect(expandedState).toBeTruthy();
			}, 5);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
