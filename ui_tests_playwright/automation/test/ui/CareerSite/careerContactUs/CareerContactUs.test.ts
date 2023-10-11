import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Navigation from '../../../../identifiers/Career/Navigation';
import ContactUsForm from '../../../../identifiers/forms/ContactUsForm';
import UrlProvider from '../../../../providers/UrlProvider';
import {contactUsSteps} from '../../../../steps/careerPageSteps/ContactUsSteps';
import Buttons from '../../../../identifiers/Buttons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test("Check that 'Contact Us' form works correct with valid data @Regression @ContactUs @TSWEB-149", async () => {
	await driver.getByTestId(ContactUsForm.FullName).fill('test name');
	await driver.getByTestId(ContactUsForm.Email).fill('email@test.com');
	await driver.getByTestId(ContactUsForm.Phone).fill('12345');
	await driver.getByTestId(Buttons.Send).click({delay: 1000}); // Delay because of form that can't catch all the fields at this moment
	await contactUsSteps.checkSuccessModalMessage('Thanks for your message. We will contact you shortly.');
});

const files = ['automation/resources/test.docx', 'automation/resources/test.pdf'];

for (const file of files) {
	test(`Check that 'Contact Us' form works correct with valid files (${file}) @Regression @ContactUs @TSWEB-149`, async () => {
		await driver.getByTestId(ContactUsForm.FullName).fill('test name');
		await driver.getByTestId(ContactUsForm.Email).fill('email@test.com');
		await driver.getByTestId(ContactUsForm.Phone).fill('12345');
		await contactUsSteps.attachFileToContactUsForm(file);
		await driver.getByTestId(Buttons.Send).click({delay: 1000}); // Delay because of form that can't catch all the fields at this moment
		await contactUsSteps.checkSuccessModalMessage('Thanks for your message. We will contact you shortly.');
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
