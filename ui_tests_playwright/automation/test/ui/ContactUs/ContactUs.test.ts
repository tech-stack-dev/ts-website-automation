import { expect, test } from '@playwright/test';
import { driver } from '../../../base/driver/Driver';
import { baseDriverSteps } from '../../../base/step/BaseDriverSteps';
import Button from '../../../identifiers/Button';
import ContactUsPreconditions from '../../../preconditionsData/uiPreconditions/ContactUsPreconditions';
import UrlPath from '../../../providers/UrlPath';
import UrlProvider from '../../../providers/UrlProvider';
import { containerSteps } from '../../../steps/components/Container/ContainerSteps';
import ContactUs from '../../../identifiers/Forms/ContactUsForm';
import Input from '../../../identifiers/Input';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @Regression @ContactUs @TSWEB-532", async () => {
	for (const url of ContactUsPreconditions.servicesUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test("Check 'Contact Us' button from 'Company' section @Regression @ContactUs @TSWEB-532", async () => {
	for (const url of ContactUsPreconditions.companyUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test("Check error messages for empty required fields on 'Contact Us' form @Regression @ContactUs @TSWEB-149", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Button.NavigationTab_ContactUs).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs, UrlProvider.careerUrl()));
	await containerSteps.checkContainerTitle(ContactUs.ContactUsFormId, 'Contact us');
	await driver.getByTestId(ContactUs.SendRequestButton).click();
	const actualErrorText_FullName = driver.getByTestId(ContactUs.FullName).locator(Input.fieldErrorSelector);
	await expect(actualErrorText_FullName).toHaveText('Please enter your name');

	const actualErrorText_Email = driver.getByTestId(ContactUs.Email).locator(Input.fieldErrorSelector);
	await expect(actualErrorText_Email).toHaveText('Please enter your email');

	const actualErrorText_Phone = driver.getByTestId(ContactUs.Phone).locator(Input.fieldErrorSelector);
	await expect(actualErrorText_Phone).toHaveText('Please enter your phone number');
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @Regression @ContactUs @TSWEB-532", async () => {
	const urlList: Array<string> = [UrlProvider.urlBuilder(UrlPath.ContactUs), UrlProvider.webSiteUrl()];

	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
