import {test, expect} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Button from '../../../../identifiers/Button';
import UrlProvider from '../../../../providers/UrlProvider';
import Navigation from '../../../../identifiers/Navigation';
import ContactUsForm from '../../../../identifiers/forms/ContactUsForm';
import {contactUsSteps} from '../../../../steps/careerPageSteps/ContactUsSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test("Check error messages related to fields filled with spaces on 'Contact Us' form @Regression @ContactUs @TSWEB-76", async () => {
	const lineWithSpaces = ' '.repeat(5);
	const testData: Record<string, string> = {
		PleaseEntryName: 'Please enter your name',
		PleaseEntryEmail: 'Please enter a valid phone number',
		PleaseEntryPhone: 'Please enter a valid email',
	};

	await driver.getByTestId(ContactUsForm.FullName).fill(lineWithSpaces);
	await driver.getByTestId(ContactUsForm.Email).fill(lineWithSpaces);
	await driver.getByTestId(ContactUsForm.Phone).fill(lineWithSpaces);
	await driver.getByTestId(Button.SendButton).click();
	const listOfMessages = await contactUsSteps.getErrorMessagesFromFields([
		ContactUsForm.FullName,
		ContactUsForm.Email,
		ContactUsForm.Phone,
	]);
	const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
	expect(messagesExistState).toBeTruthy();
});

test("Check error messages related to fields filled with invalid data on 'Contact Us' form @Regression @ContactUs @TSWEB-76", async () => {
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
		PleaseEntryEmail: 'Please enter a valid phone number',
		PleaseEntryPhone: 'Please enter a valid email',
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
});

test("Check error messages related to empty fields on 'Contact Us' form @Regression @ContactUs @TSWEB149", async () => {
	const testData: Record<string, string> = {
		PleaseEntryName: 'Please enter your name',
		PleaseEntryEmail: 'Please enter your email',
		PleaseEntryPhone: 'Please enter your phone number',
	};
	await driver.getByTestId(Button.SendButton).click();
	const listOfMessages = await contactUsSteps.getErrorMessagesFromFields([
		ContactUsForm.FullName,
		ContactUsForm.Email,
		ContactUsForm.Phone,
	]);
	const messagesExistState = Object.values(testData).every((message) => listOfMessages.includes(message));
	expect(messagesExistState).toBeTruthy();
});

test('Check error messages related to incorrect file format @Regression @ContactUs @TSWEB149', async () => {
	await driver.getByTestId(ContactUsForm.FullName).fill('Test Name');
	await driver.getByTestId(ContactUsForm.Email).fill('email@test.com');
	await driver.getByTestId(ContactUsForm.Phone).fill('12345');
	await contactUsSteps.attachFileToContactUsForm('automation/resources/test.jpg');
	await contactUsSteps.checkFileAttachErrorMessage(
		'You can only attach the file in *.doc, *.pdf, *.docx, *.txt, *.text, and *.log extensions'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
