import {test} from '@playwright/test';
import {expect} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Navigation from '../../../../identifiers/career/Navigation';
import UrlProvider from '../../../../providers/UrlProvider';
import {contactUsSteps} from '../../../../steps/careerPageSteps/ContactUsSteps';
import Buttons from '../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import Input from '../../../../identifiers/Input';
import ContactUsCareer from '../../../../identifiers/career/pages/ContactUsCareer';
import {HRTeamLinkedInLinks} from '../../../../identifiers/career/HRTeamLinkedInLinks';
import {HRTeamName} from '../../../../identifiers/career/HRTeamName';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test(
	qase(
		5666,
		'Check section titles and numbers from the "Contact us" page @desktop @mobile @Regression @ContactUs @TSWEB-149'
	),
	async () => {
		await expect(driver.getByTestId(ContactUsCareer.ContactWithHRDepartmentTitle)).toHaveText(
			'Contact with HR Department'
		);
		await expect(driver.getByTestId(ContactUsCareer.ContactWithHRDepartmentNumber)).toHaveText('01');

		await expect(driver.locator(ContactUsCareer.OurHRTeamTitle)).toHaveText('Our HR Team');
		await expect(driver.getByTestId(ContactUsCareer.OurHRTeamNumber)).toHaveText('02');

		await expect(driver.locator(ContactUsCareer.ContactUsTitle)).toHaveText('Contact us');
		await expect(driver.getByTestId(ContactUsCareer.ContactUsNumber)).toHaveText('03');
	}
);

test(
	qase(
		5667,
		'Check redirects by LinkedIn buttons in "Our HR Team" container from the "Contact us" page @desktop @mobile @Regression @ContactUs @TSWEB-149'
	),
	async () => {
		const ourHRTeamContainer = driver.locator(ContactUsCareer.OurHRTeamContainer);
		const linkedInButtons = ourHRTeamContainer.getByTestId(ContactUsCareer.LinkedInButton);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), HRTeamLinkedInLinks.MariaDarmanian],
			[linkedInButtons.nth(1), HRTeamLinkedInLinks.YuliaKulyk],
			[linkedInButtons.nth(2), HRTeamLinkedInLinks.AlinaTkachenko],
			[linkedInButtons.nth(3), HRTeamLinkedInLinks.ValeriiaZvonova],
			[linkedInButtons.nth(4), HRTeamLinkedInLinks.KatyaRomakh],
			[linkedInButtons.nth(5), HRTeamLinkedInLinks.TatyanaKorotich],
			[linkedInButtons.nth(6), HRTeamLinkedInLinks.ViktoriiaKharchenko],
			[linkedInButtons.nth(7), HRTeamLinkedInLinks.OlenaLazutkina],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5668,
		'Check member names and roles in "Our HR Team" container from the "Contact us" page @desktop @mobile @Regression @ContactUs @TSWEB-149'
	),
	async () => {
		const ourHRTeamContainer = driver.locator(ContactUsCareer.OurHRTeamContainer);
		await ourHRTeamContainer.waitFor({state: 'visible'});

		const memberCards = ourHRTeamContainer.locator(ContactUsCareer.MemberCard);
		const numOfMembers = 8;
		await expect(memberCards).toHaveCount(numOfMembers);

		const allMemberRoles = ourHRTeamContainer.locator(ContactUsCareer.MemberRole);

		const testDataRoles = [
			'Head of HR',
			'Talent Acquisition Lead',
			'HR Specialist',
			'HR Generalist',
			'HR Business Partner',
			'HR Operations Manager',
			'Talent Acquisition Specialist',
			'Talent Acquisition Specialist',
		];

		await expect(allMemberRoles).toHaveCount(testDataRoles.length);

		for (let i = 0; i < testDataRoles.length; i++) {
			await expect(allMemberRoles.nth(i)).toHaveText(testDataRoles[i]);
		}

		const allMemberNames = ourHRTeamContainer.locator(ContactUsCareer.MemberName);
		const testDataNames = [
			HRTeamName.MariaDarmanian,
			HRTeamName.YuliaKulyk,
			HRTeamName.AlinaTkachenko,
			HRTeamName.ValeriiaZvonova,
			HRTeamName.KatyaRomakh,
			HRTeamName.TatyanaKorotich,
			HRTeamName.ViktoriiaKharchenko,
			HRTeamName.OlenaLazutkina,
		];

		await expect(allMemberNames).toHaveCount(testDataNames.length);

		for (let i = 0; i < testDataNames.length; i++) {
			await expect(allMemberNames.nth(i)).toHaveText(testDataNames[i]);
		}
	}
);

test(
	qase(
		4759,
		'Check that "Contact Us" form works correct with valid data @desktop @mobile @Regression @ContactUs @TSWEB-149'
	),
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
	test(
		qase(
			[4755, 4757],
			`Check that 'Contact Us' form works correct with valid files (${file}) @desktop @mobile @Regression @ContactUs @TSWEB-149`
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
