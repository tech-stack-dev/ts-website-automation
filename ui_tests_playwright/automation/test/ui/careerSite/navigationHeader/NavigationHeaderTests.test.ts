import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import { driver } from '../../../../base/driver/Driver';
import { careerSteps, test } from '../../../../fixtures/DesktopMobileSetup';
import { qase } from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(
	qase(4868, 'Check that user can switch language in navigation header @desktop @mobile @Regression @NavigationHeader @TSWEB-560'),
	async () => {
		await careerSteps.switchLanguage('ua');
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
