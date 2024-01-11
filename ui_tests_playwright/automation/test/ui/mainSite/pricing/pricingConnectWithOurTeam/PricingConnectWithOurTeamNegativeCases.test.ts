import {expect, test} from '@playwright/test';
import UrlPath from '../../../../../providers/UrlPath';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import ConnectWithOurTeamForm from '../../../../../identifiers/forms/ConnectWithOurTeamForm';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {formSteps} from '../../../../../steps/ui/FormSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Pricing));
	await driver.getByTestId(MainSiteButtons.ChooseThisModel).click();
});

test('Check error messages related to fields filled with spaces on "Connect With Our Team" form @Regression @Pricing @TSWEB-1297', async () => {
	const lineWithSpaces = ' '.repeat(5);
	const testData: Record<string, string> = {
		PleaseEnterFullName: 'Enter your full name, please',
		PleaseEnterEmail: 'Enter your email, please',
		PleaseEnterService: 'Choose one or more options, please',
		PleaseEnterPlatform: 'Choose one or more options, please',
	};

	await driver.getByTestId(ConnectWithOurTeamForm.FullName).fill(lineWithSpaces, {timeout: 10000});
	await driver.getByTestId(ConnectWithOurTeamForm.Email).fill(lineWithSpaces, {timeout: 10000});
	await driver.getByTestId(Buttons.Send).click({timeout: 10000});
	const listOfMessages = await formSteps.getErrorMessagesFromFields([
		ConnectWithOurTeamForm.FullName,
		ConnectWithOurTeamForm.Email,
		ConnectWithOurTeamForm.Services,
		ConnectWithOurTeamForm.Platform,
	]);
	const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
	expect(messagesExistState).toBeTruthy();
});

test('Check error messages related to fields filled with invalid data on "Connect With Our Team" form @Regression @Pricing @TSWEB-1297', async () => {
	const incorrectEmails = ['12345', '@test.com', 'email@-test.com', '!@#$%'];

	const pleaseEnterEmail = 'Please enter a valid email';

	for (const incorrectEmail of incorrectEmails) {
		await driver.getByTestId(ConnectWithOurTeamForm.Email).fill(incorrectEmail, {timeout: 10000});
		await driver.getByTestId(Buttons.Send).click({timeout: 10000});
		const listOfMessages = await formSteps.getErrorMessagesFromFields([ConnectWithOurTeamForm.Email]);

		expect(listOfMessages).toContain(pleaseEnterEmail);
	}
});

test('Check error messages related to empty fields on "Connect With Our Team" form @Regression @Pricing @TSWEB-1297', async () => {
	const testData: Record<string, string> = {
		PleaseEnterFullName: 'Enter your full name, please',
		PleaseEnterEmail: 'Enter your email, please',
		PleaseEnterService: 'Choose one or more options, please',
		PleaseEnterPlatform: 'Choose one or more options, please',
	};
	await driver.getByTestId(Buttons.Send).click();
	const listOfMessages = await formSteps.getErrorMessagesFromFields([
		ConnectWithOurTeamForm.FullName,
		ConnectWithOurTeamForm.Email,
		ConnectWithOurTeamForm.Services,
		ConnectWithOurTeamForm.Platform,
	]);
	const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
	expect(messagesExistState).toBeTruthy();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
