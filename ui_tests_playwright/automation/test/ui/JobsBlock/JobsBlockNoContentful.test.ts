import {expect, test} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Button from '../../../identifiers/Button';
import ApplyForAJobForm from '../../../identifiers/Forms/ApplyForAJobForm';
import Input from '../../../identifiers/Input';
import UrlProvider from '../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
});

test('Check that "First Name" and "Last Name" input fields does not accept only spaces in "Apply for a Job" modal window on job page @Regression @JobsBlock @TSWEB-76', async () => {
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(Button.ApplyNow).click();

	await driver.getByTestId(ApplyForAJobForm.FirstName).fill(' ');
	await driver.getByTestId(ApplyForAJobForm.LastName).fill(' '.repeat(99)); // Field accepts up to 100 characters
	await driver.getByTestId(Button.SendButton).click();

	const actualErrorText_FirstName = driver.getByTestId(ApplyForAJobForm.FirstName).locator(Input.fieldErrorSelector);
	const actualErrorText_LastName = driver.getByTestId(ApplyForAJobForm.LastName).locator(Input.fieldErrorSelector);
	await expect(actualErrorText_FirstName).toHaveText('Please enter your name');
	await expect(actualErrorText_LastName).toHaveText('Please enter your last name');
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
