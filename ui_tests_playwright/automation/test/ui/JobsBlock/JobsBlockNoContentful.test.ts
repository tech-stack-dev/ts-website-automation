import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import Input from '../../../identifiers/Input';
import Button from '../../../identifiers/Button';
import ApplyForAJobForm from '../../../identifiers/Forms/ApplyForAJobForm';
import ContainerByClass from '../../../components/Container/ContainerByClass';

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

test('Check search field styling after search a long jobname on careers page @Regression @JobsBlock @TSWEB-75 @TSWEB-116', async () => {
	// Check that input size is not changed after searching
	const textData = 'L0ngTe$tD@ta'.repeat(10);
	const expectedInputBoxProps = await driver.getByTestId(Career.searchCareerField).boundingBox();
	await driver.getByTestId(Career.searchCareerField).fill(textData);
	await expect((await driver.component(ContainerByClass, Containers.searchResultsTextContainer)).Element).toHaveText(
		`${textData},0`
	);
	const actualInputBoxProps = await driver.getByTestId(Career.searchCareerField).boundingBox();
	await expect(actualInputBoxProps?.width).toEqual(expectedInputBoxProps?.width);
	await expect(actualInputBoxProps?.height).toEqual(expectedInputBoxProps?.height);
	// Check that input is not covered by another element after searching
	(await driver.component(ContainerByClass, Containers.searchResultsTextContainer)).click();
	await driver.getByTestId(Career.searchCareerField).click();
	await expect(driver.getByTestId(Career.searchCareerField)).toBeFocused();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
