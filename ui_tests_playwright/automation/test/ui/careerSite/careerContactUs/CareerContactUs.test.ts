import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Navigation from '../../../../identifiers/career/Navigation';
import UrlProvider from '../../../../providers/UrlProvider';
import {contactUsSteps} from '../../../../steps/careerPageSteps/ContactUsSteps';
import Buttons from '../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import Input from '../../../../identifiers/Input';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test.skip(
	qase(4759, 'Check that "Contact Us" form works correct with valid data @Regression @ContactUs @TSWEB-149'),
	async () => {
		await driver.getByTestId(Input.FullName).fill('test name');
		await driver.getByTestId(Input.Email).fill('email@test.com');
		await driver.getByTestId(Input.PhoneNumber).fill('12345');
		await driver.getByTestId(Buttons.Send).click({delay: 1000}); // Delay because of form that can't catch all the fields at this moment
		await contactUsSteps.checkSuccessModalMessage('Thanks for your message. We will contact you shortly.');
	}
);

const files = ['automation/resources/test.docx', 'automation/resources/test.pdf'];

for (const file of files) {
	test.skip(
		qase(
			[4755, 4757],
			`Check that 'Contact Us' form works correct with valid files (${file}) @Regression @ContactUs @TSWEB-149`
		),
		async () => {
			await driver.getByTestId(Input.FullName).fill('test name');
			await driver.getByTestId(Input.Email).fill('email@test.com');
			await driver.getByTestId(Input.PhoneNumber).fill('12345');
			await contactUsSteps.attachFileToContactUsForm(file);
			await driver.getByTestId(Buttons.Send).click({delay: 1000}); // Delay because of form that can't catch all the fields at this moment
			await contactUsSteps.checkSuccessModalMessage('Thanks for your message. We will contact you shortly.');
		}
	);
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
