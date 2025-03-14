import {test, expect} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import ContactUs from '../../../../identifiers/mainSite/pages/contactUs/ContactUs';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import MainSiteImages from '../../../../identifiers/mainSite/MainSiteImages';
import ContactsBlock from '../../../../identifiers/mainSite/ContactsBlock';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
});

test(
	qase(4968, 'Check the Title from the "Contact Us" page @desktop @mobile @Regression @ContactUs @TSWEB-1082'),
	async () => {
		const infoContainer = driver.getByTestId(ContactUs.ContactUs);
		await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Connect with Techstack');
	}
);

test(
	qase(
		4974,
		'Check the container title and number from the "Contact Us" page @desktop @mobile @Regression @ContactUs @TSWEB-148 @TSWEB-1082'
	),
	async () => {
		const containers = [
			driver.getByTestId(ContactUs.ContactUsForm),
			driver.getByTestId(ContactUs.ConsultWithUs),
			driver.getByTestId(ContactUs.TrustedBy),
			driver.getByTestId(ContactUs.Cooperation),
		];

		const expectedData = [
			['Get in Touch', '01'],
			['Consult with us', '02'],
			['Trusted By', '03'],
			['Cooperation', '04'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test('Check contact information in "Get in Touch" container from the "Contact Us" page @desktop @mobile @Regression @ContactUs @TSWEB-1833', async () => {
	const contactUsForm = driver.getByTestId(ContactUs.ContactUsForm);
	const copyIcon = driver.getByTestId(ContactsBlock.CopyEmail);
	const notification = driver.getByTestId(ContactsBlock.CopyEmailNotification);
	const callUs = 'Call us';
	const phoneNumberDataUSA = '+1-312-442-0823 (USA)';
	const phoneNumberDataEU = '+4-871-735-3668 (EU)';
	const sayHi = 'Say hi';
	const email = 'hello@tech-stack.com';

	baseDriverSteps.checkContactsPhone(contactUsForm, `${callUs}${phoneNumberDataUSA}${phoneNumberDataEU}`);
	baseDriverSteps.checkContactsEmail(contactUsForm, `${sayHi}${email}`);

	await copyIcon.click();
	expect(await notification.getAttribute('style')).toBe('display: block;');
	await expect(notification).toHaveText('Copied');
	await baseDriverSteps.checkClipBoardContect(email);
});

test(
	qase(
		5611,
		'Check partner logos in "Trusted By" container from the "Contact Us" page @desktop @mobile @Regression @ContactUs @TSWEB-148'
	),
	async () => {
		const trustedByContainer = driver.getByTestId(ContactUs.TrustedBy);
		await trustedByContainer.scrollIntoViewIfNeeded();

		const partnerLogos = [
			trustedByContainer.getByTestId(MainSiteImages.Corel),
			trustedByContainer.getByTestId(MainSiteImages.VivaQuantLogo),
			trustedByContainer.getByTestId(MainSiteImages.SkillLabLogo),
			trustedByContainer.getByTestId(MainSiteImages.ExaumLogo),
			trustedByContainer.getByTestId(MainSiteImages.RuckifyLogo),
			trustedByContainer.getByTestId(MainSiteImages.CorelLogo),
			trustedByContainer.getByTestId(MainSiteImages.SavageLogo),
			trustedByContainer.getByTestId(MainSiteImages.SidepostLogo),
		];

		for (const logo of partnerLogos) {
			await expect(logo).toBeVisible();
		}
	}
);

test(
	qase(
		5003,
		'Check section number, title and description in "Cooperation" container from the "Contact Us" page @desktop @mobile @Regression @ContactUs @TSWEB-148'
	),
	async () => {
		const cooperationContactsContainer = driver.getByTestId(ContactUs.Cooperation);

		await expect(cooperationContactsContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
		]);

		const allSectionTitles = cooperationContactsContainer.getByTestId(Container.SectionTitle);
		const testDataTitles = [
			'Poland, Wroclaw',
			'Ukraine, Kyiv',
			'Ukraine, Lviv',
			'Estonia, Tallinn',
			'Ukraine, Kharkiv',
			'Hong Kong',
		];
		await expect(allSectionTitles).toHaveText(testDataTitles);

		const allSectionDescriptions = cooperationContactsContainer.getByTestId(Container.SectionDescription);
		const testDataDescriptions = [
			'9 Rybacka street,\nWroclaw, 53-656',
			'3 Borysohlibska street,\nKyiv, 04070',
			'10 Shevchenko Ave,\nLviv, 79000',
			'Liikuri tn 10-107,\nTallinn, 13618',
			'20A August 23 street,\nKharkiv, 61101',
			'No. 5, 17/F, Strand 50,\n50 Bonham Strand,\nSheung Wan, Hong Kong',
		];
		await expect(allSectionDescriptions).toHaveText(testDataDescriptions);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
