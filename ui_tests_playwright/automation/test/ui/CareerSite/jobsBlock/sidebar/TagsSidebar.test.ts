import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../../providers/UrlProvider';
import {careerSteps} from '../../../../../steps/careerPageSteps/CareerSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(`Check that all tags dropdowns are expanded by default @Regression @FilterBlock @TSWEB-145`, async () => {
	const dropdowns: string[] = ['Directions', 'Seniority levels', 'Technology stack', 'Tags'];

	for (const dropdown of dropdowns) {
		const expandedState = careerSteps.dropdownIsExpanded(dropdown);
		expect(expandedState).toBeTruthy();
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
