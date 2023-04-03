import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import Career from '../../../identifiers/Career';
import Containers from '../../../identifiers/Containers';
import Input from '../../../identifiers/Input';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
});

test('Check that "First Name" and "Last Name" input fields does not accept only spaces in "Apply for a Job" modal window on job page @Regression @JobsBlock @TSWEB-76', async () => {
	await driver.locator(`[data-id*=${Containers.careerCardWithoutModifier}]`).nth(1).click();
	await driver.getByTestId(Career.ApplyNowButton).click();

	await driver.getByTestId(Career.Modal_firstNameInput).fill(" ");
	await driver.getByTestId(Career.Modal_lastNameInput).fill(" ".repeat(99));
	await driver.getByTestId(Career.Modal_sendRequestButton).click();

	const actualErrorText_FirstName = await driver
		.getByTestId(Career.Modal_firstNameInput)
		.locator(Input.fieldErrorSelector)
		.textContent();
	const actualErrorText_LastName = await driver
		.getByTestId(Career.Modal_lastNameInput)
		.locator(Input.fieldErrorSelector)
		.textContent();
	expect(actualErrorText_FirstName).toEqual('Please enter your name');
	expect(actualErrorText_LastName).toEqual('Please enter your last name');
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
