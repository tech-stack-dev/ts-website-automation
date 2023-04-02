import { test, expect  } from '@playwright/test';
import { driver } from '../../../base/driver/Driver';
import { baseDriverSteps } from '../../../base/step/BaseDriverSteps';
import Button from '../../../identifiers/Button';
import ContactUs from '../../../identifiers/ContactUs';
import Input from '../../../identifiers/Input';
import UrlProvider from '../../../providers/UrlProvider';

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
    await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
    await driver.getByTestId(Button.NavigationTab_ContactUs).click();
});

test("Check that 'Full Name' input field does not accept only spaces in the 'Contact Us' form @Regression @JobsBlock @TSWEB-76", async () => {
	const testData: Array<string> = [
		" ",
		"                                         " 
	];

    for(const data of testData){
		await driver.getByTestId(ContactUs.fullNameInput).fill(data);
		await driver.getByTestId(ContactUs.sendRequestButton).click();
		const actualErrorText_FullName = await driver.getByTestId(ContactUs.fullNameInput).locator(Input.fieldErrorSelector).textContent();

		expect(actualErrorText_FullName).toEqual("Please enter your name");

	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
