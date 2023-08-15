import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Container from '../../../../../identifiers/Container';
import RenewableEnergy from '../../../../../identifiers/MainSite/pages/industries/RenewableEnergy';
import MainSiteButton from '../../../../../identifiers/MainSite/MainSiteButton';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test("Check the header from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const info = driver.getByTestId(RenewableEnergy.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nRenewable Energy');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Software Development\nfor the Renewable\nEnergy Industry'
	);
	await expect(info.getByTestId(MainSiteButton.GetInTouch)).toBeVisible();
});

test("Check the container title and number from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	await expect(
		driver.getByTestId(RenewableEnergy.TechstackInNumbers).getByTestId(Container.ContainerTitle)
	).toHaveText('Techstack in Numbers');
	await expect(
		driver.getByTestId(RenewableEnergy.TechstackInNumbers).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(driver.getByTestId(RenewableEnergy.WhoWeServe).getByTestId(Container.ContainerTitle)).toHaveText(
		'Who We Serve'
	);
	await expect(driver.getByTestId(RenewableEnergy.WhoWeServe).getByTestId(Container.ContainerNumber)).toHaveText(
		'02'
	);

	await expect(
		driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ).getByTestId(Container.ContainerTitle)
	).toHaveText('Renewable Energy Software Development Services');
	await expect(
		driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(
		driver.getByTestId(RenewableEnergy.TheSolarEnergyDataPortalByTechstack).getByTestId(Container.ContainerTitle)
	).toHaveText('The Solar Energy Data Portal by Techstack');
	await expect(
		driver.getByTestId(RenewableEnergy.TheSolarEnergyDataPortalByTechstack).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise).getByTestId(Container.ContainerTitle)
	).toHaveText('Our Key Areas of Expertise in Renewable Energy');
	await expect(
		driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(driver.getByTestId(RenewableEnergy.WhyChooseUs).getByTestId(Container.ContainerTitle)).toHaveText(
		'Why Choose Us?'
	);
	await expect(driver.getByTestId(RenewableEnergy.WhyChooseUs).getByTestId(Container.ContainerNumber)).toHaveText(
		'06'
	);

	await expect(
		driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack).getByTestId(Container.ContainerTitle)
	).toHaveText('How We Operate at Techstack');
	await expect(
		driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack).getByTestId(Container.ContainerNumber)
	).toHaveText('07');

	await expect(driver.getByTestId(RenewableEnergy.OurWorkflow).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our Workflow'
	);
	await expect(driver.getByTestId(RenewableEnergy.OurWorkflow).getByTestId(Container.ContainerNumber)).toHaveText(
		'08'
	);

	await expect(driver.getByTestId(RenewableEnergy.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(RenewableEnergy.Faq).getByTestId(Container.ContainerNumber)).toHaveText('09');
});

test("Check block titles in 'Techstack in Numbers' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const techstackInNumbersContainer = driver.getByTestId(RenewableEnergy.TechstackInNumbers);
	const allBlockTitles = await techstackInNumbersContainer.getByTestId(Container.BlockTitle).allInnerTexts();
	const testData = ['9\nyears', '20\nexperts', '91\n%', '2 of 3\nclients'];

	expect(allBlockTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and numbers in 'Who We Serve' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const whoWeServeContainer = driver.getByTestId(RenewableEnergy.WhoWeServe);
	const allSectionTitles = await whoWeServeContainer.getByTestId(Container.SectionTitle).allInnerTexts();

	expect(await whoWeServeContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
	]);

	const testData = [
		'Industry service companies',
		'Renewable energy producers and distributors',
		'EV charging\nproviders',
		'Industrial\nmanufacturers',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and CTA button in 'Renewable Energy Software Development Services' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const renewableEnergySoftDevServContainer = driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ);
	const allSectionTitles = await renewableEnergySoftDevServContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	// Check
	const testData = [
		'Industry service codfsgmpanies',
		'Renewable energy producers and distributors',
		'EV charging\nproviders',
		'Industrial\nmanufacturers',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	await expect(renewableEnergySoftDevServContainer.getByTestId(MainSiteButton.BookAMeeting)).toBeVisible();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
