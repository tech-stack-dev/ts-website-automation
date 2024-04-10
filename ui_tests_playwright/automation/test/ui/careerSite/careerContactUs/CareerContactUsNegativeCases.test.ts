import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Navigation from '../../../../identifiers/career/Navigation';
import UrlProvider from '../../../../providers/UrlProvider';
import {contactUsSteps} from '../../../../steps/careerPageSteps/ContactUsSteps';
import {formSteps} from '../../../../steps/ui/FormSteps';
import Buttons from '../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import Input from '../../../../identifiers/Input';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test(
	qase(
		4753,
		'Check error messages related to fields filled with spaces on "Contact Us" form @desktop @mobile @Regression @ContactUs @TSWEB-76'
	),
	async () => {
		const lineWithSpaces = ' '.repeat(5);
		const testData: Record<string, string> = {
			PleaseEntryName: 'Please enter your name',
			PleaseEntryPhone: 'Please enter a valid phone number',
			PleaseEntryEmail: 'Please enter your email',
		};

		await driver.getByTestId(Input.FullName).fill(lineWithSpaces, {timeout: 10000});
		await driver.getByTestId(Input.Email).fill(lineWithSpaces, {timeout: 10000});
		await driver.getByTestId(Input.PhoneNumber).fill(lineWithSpaces, {timeout: 10000});
		await driver.getByTestId(Buttons.Send).click({timeout: 10000});
		const listOfMessages = await formSteps.getErrorMessagesFromFields([
			Input.FullName,
			Input.Email,
			Input.PhoneNumber,
		]);
		const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
		expect(messagesExistState).toBeTruthy();
	}
);

test(
	qase(
		4763,
		'Check error messages related to fields filled with invalid data on "Contact Us" form @desktop @mobile @Regression @ContactUs @TSWEB-76'
	),
	async () => {
		const incorrectEmails: Record<string, string> = {
			numberEmail: '12345',
			withoutFirstEmail: '@test.com',
			incorrectFormatEmail: 'email@-test.com',
			symbolsEmail: '!@#$%',
		};

		const incorrectPhones: Record<string, string> = {
			minusNumbers: '-12345',
			textPhone: 'test',
			symbolsPhone: '!@#$%',
			plusNumbers: '+12345+',
		};

		const testData: Record<string, string> = {
			PleaseEntryPhone: 'Please enter a valid phone number',
			PleaseEntryEmail: 'Please enter a valid email',
		};

		const testCases = [
			{email: incorrectEmails.numberEmail, phone: incorrectPhones.minusNumbers},
			{email: incorrectEmails.withoutFirstEmail, phone: incorrectPhones.textPhone},
			{email: incorrectEmails.incorrectFormatEmail, phone: incorrectPhones.symbolsPhone},
			{email: incorrectEmails.symbolsEmail, phone: incorrectPhones.plusNumbers},
		];

		for (const testCase of testCases) {
			const messagesExistState = await contactUsSteps.sendDataToFieldsAndCheckErrorMessages(
				testCase.email,
				testCase.phone,
				testData
			);
			expect(messagesExistState).toBeTruthy();
		}
	}
);

test(
	qase(4762, 'Check error messages related to empty fields on "Contact Us" form @desktop @mobile @Regression @ContactUs @TSWEB149'),
	async () => {
		const testData: Record<string, string> = {
			PleaseEntryName: 'Please enter your name',
			PleaseEntryEmail: 'Please enter your email',
			PleaseEntryPhone: 'Please enter your phone number',
		};
		await driver.getByTestId(Buttons.Send).click();
		const listOfMessages = await formSteps.getErrorMessagesFromFields([
			Input.FullName,
			Input.Email,
			Input.PhoneNumber,
		]);
		const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
		expect(messagesExistState).toBeTruthy();
	}
);

test(qase(4765, 'Check error message related to incorrect file format @desktop @mobile @Regression @ContactUs @TSWEB149'), async () => {
	await driver.getByTestId(Input.FullName).fill('Test Name');
	await driver.getByTestId(Input.Email).fill('email@test.com');
	await driver.getByTestId(Input.PhoneNumber).fill('12345');
	await contactUsSteps.attachFileToContactUsForm('automation/resources/test.jpg');
	await contactUsSteps.checkFileAttachErrorMessage(
		'You can only attach the file in *.doc, *.pdf, *.docx, *.txt, *.text, and *.log extensions'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
