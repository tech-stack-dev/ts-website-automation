import {test, expect} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import ContactUs from '../../../../identifiers/MainSite/pages/contactUs/ContactUs';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
});

test("Check the container title and number from the 'Contact Us' block @Regression @ContactUs @TSWEB-148", async () => {
	const containers = [driver.getByTestId(ContactUs.GetInTouch), driver.getByTestId(ContactUs.Cooperation)];

	const expectedData = [
		['Get in Touch', '01'],
		['Cooperation', '02'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

// Unskip after adding data-id to images and container
test.skip("Check images in 'Get in Touch' container from the 'Contact Us' block @Regression @ContactUs @TSWEB-148", async () => {
	const formContainerContainer = driver.getByTestId(ContactUs.FormContainer);

	await baseDriverSteps.checkAwardCardsVisibility(formContainerContainer, 8);
});

test("Check contact information in 'Cooperation' container from the 'Contact Us' block @Regression @ContactUs @TSWEB-148", async () => {
	const cooperationContainer = driver.getByTestId(ContactUs.Cooperation);

	await expect(cooperationContainer.getByTestId(Container.Email)).toHaveText('Email\nhello@tech-stack.io');
	await expect(cooperationContainer.getByTestId(Container.Phone)).toHaveText('Phone number\n+1-312-442-0823');
});

test("Check section number, title and description in 'Cooperation' container from the 'Contact Us' block @Regression @ContactUs @TSWEB-148", async () => {
	const cooperationContainer = driver.getByTestId(ContactUs.Cooperation);

	await expect(cooperationContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	const allSectionTitles = cooperationContainer.getByTestId(Container.SectionTitle);
	const testDataTitles = [
		'Poland,\nWroclaw',
		'Ukraine,\nKyiv',
		'Ukraine,\nLviv',
		'Estonia,\nTallinn',
		'Ukraine,\nKharkiv',
		'Hong\nKong',
	];
	await expect(allSectionTitles).toHaveText(testDataTitles);

	const allSectionDescriptions = cooperationContainer.getByTestId(Container.SectionDescription);
	const testDataDescriptions = [
		'9 Rybacka street,\nWroclaw, 53-656',
		'3 Borysohlibska street,\nKyiv, 04070',
		'1 Shpytalʹna street,\nLviv, 79000',
		'Liikuri tn 10-107,\nTallinn, 13618',
		'20A August 23 street,\nKharkiv, 61101',
		'No. 5, 17/F, Strand 50,\n50 Bonham Strand,\nSheung Wan, Hong Kong',
	];
	await expect(allSectionDescriptions).toHaveText(testDataDescriptions);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
