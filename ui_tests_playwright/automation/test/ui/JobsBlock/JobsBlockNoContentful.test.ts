import {expect, test} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import Button from '../../../identifiers/Button';
import ApplyForAJobForm from '../../../identifiers/forms/ApplyForAJobForm';
import Link from '../../../identifiers/Link';
import Input from '../../../identifiers/Input';
import UrlProvider from '../../../providers/UrlProvider';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Career from '../../../identifiers/Career';
import Containers from '../../../identifiers/Containers';
import randomstring from 'randomstring';
import ContainerByClass from '../../../components/container/ContainerByClass';

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

	const actualErrorText_FirstName = driver.getByTestId(ApplyForAJobForm.FirstName).locator(Input.FieldErrorSelector);
	const actualErrorText_LastName = driver.getByTestId(ApplyForAJobForm.LastName).locator(Input.FieldErrorSelector);
	await expect(actualErrorText_FirstName).toHaveText('Please enter your name');
	await expect(actualErrorText_LastName).toHaveText('Please enter your last name');
});

test('Check that Jobs link from breadcrumbs leads the user to the main Jobs page @Regression @JobsBlock @TSWEB-142 @TSWEB-82', async () => {
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(Link.Breadcrumbs_Jobs).click();

	await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
	await expect(driver.getByTestId(/CardWrapper/)).toBeVisible();
});

test('Check search field styling after search a long jobname on careers page @Regression @JobsBlock @TSWEB-75 @TSWEB-116', async () => {
	// Check that input size is not changed after searching
	const textData = randomstring.generate(50);
	const expectedInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
	await driver.getByTestId(Career.SarchCareerField).fill(textData);
	await expect((await driver.component(ContainerByClass, Containers.SearchResultsTextContainer)).Element).toHaveText(
		`${textData},0`
	);
	const actualInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
	expect(actualInputBoxProps?.width).toEqual(expectedInputBoxProps?.width);
	expect(actualInputBoxProps?.height).toEqual(expectedInputBoxProps?.height);
	// Check that input is not covered by another element after searching
	await (await driver.component(ContainerByClass, Containers.SearchResultsTextContainer)).click();
	await driver.getByTestId(Career.SarchCareerField).click();
	await expect(driver.getByTestId(Career.SarchCareerField)).toBeFocused();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
