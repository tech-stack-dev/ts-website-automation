import {test} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Button from '../../../identifiers/Button';
import ContactUsPreconditions from '../../../preconditionsData/uiPreconditions/ContactUsPreconditions';
import UrlPath from '../../../providers/UrlPath';
import UrlProvider from '../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @Regression @ContactUs @TSWEB-532", async () => {
	for (const url of ContactUsPreconditions.servicesUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test("Check 'Contact Us' button from 'Company' section @Regression @ContactUs @TSWEB-532", async () => {
	for (const url of ContactUsPreconditions.companyUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @Regression @ContactUs @TSWEB-532", async () => {
	const urlList: Array<string> = [
		UrlProvider.urlBuilder(UrlPath.ContactUs),
		UrlProvider.webSiteUrl(),
	];

	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
