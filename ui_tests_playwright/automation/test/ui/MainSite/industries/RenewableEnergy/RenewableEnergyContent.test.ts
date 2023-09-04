import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';
import RenewableEnergy from '../../../../../identifiers/MainSite/pages/industries/RenewableEnergy';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test("Check the header from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const info = driver.getByTestId(RenewableEnergy.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nRenewable Energy');
	await expect(info.getByTestId(Container.Title)).toHaveText(
		'Software Development\nfor the Renewable\nEnergy Industry'
	);
	await expect(info.getByTestId(MainSiteButtons.GetInTouch)).toBeVisible();
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
	const allBlockTitles = techstackInNumbersContainer.getByTestId(Container.BlockTitle);
	const testData = ['9\nyears', '20\nexperts', '91\n%', '2 of 3\nclients'];

	await expect(allBlockTitles).toHaveText(testData);
});

test("Check section titles and numbers in 'Who We Serve' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const whoWeServeContainer = driver.getByTestId(RenewableEnergy.WhoWeServe);

	await expect(whoWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

	const allSectionTitles = whoWeServeContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Industry service companies',
		'Renewable energy producers and distributors',
		'EV charging\nproviders',
		'Industrial\nmanufacturers',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check block titles, section titles and CTA button in 'Renewable Energy Software Development Services' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const renewableEnergySoftDevServContainer = driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ);
	const allBlockTitles = renewableEnergySoftDevServContainer.getByTestId(Container.BlockTitle);
	const testDataBlockTitles = [
		'Domain-Specific Software for the Renewable Energy Industry',
		'Energy Management Systems',
		'Energy Infrastructure\nand Analysis',
	];
	await expect(allBlockTitles).toHaveText(testDataBlockTitles);

	const containerBlocks = await renewableEnergySoftDevServContainer.getByTestId(Container.ContainerBlock).all();
	const testDataSectionTitles = ['Overview', 'Implementation\nin the real world'];

	for (const block of containerBlocks) {
		const sectionTitles = block.getByTestId(Container.SectionTitle);
		await expect(sectionTitles).toHaveText(testDataSectionTitles);
	}

	await expect(renewableEnergySoftDevServContainer.getByTestId(MainSiteButtons.BookAMeeting)).toBeVisible();
});

test("Check section titles, block title, image and CTA button in 'The Solar Energy Data Portal by Techstack' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const theSolarEnergyContainer = driver.getByTestId(RenewableEnergy.TheSolarEnergyDataPortalByTechstack);
	const allSectionTitles = theSolarEnergyContainer.getByTestId(Container.SectionTitle);
	const testData = ['Improved efficiency', 'Energy-centric system for customers', 'Data normalization'];
	await expect(allSectionTitles).toHaveText(testData);

	const blockTitle = theSolarEnergyContainer.getByTestId(Container.BlockTitle);
	await expect(blockTitle).toHaveText('Solar energy data portal scheme');

	await expect(theSolarEnergyContainer.getByTestId(MainSiteImages.SolarEnergy)).toBeVisible();
	await expect(theSolarEnergyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuiltIt)).toBeVisible();
});

test("Check section titles in 'Our Key Areas of Expertise in Renewable Energy' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const ourKeyAreasOfExpertiseContainer = driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise);
	const allSectionTitles = ourKeyAreasOfExpertiseContainer.getByTestId(Container.SectionTitle);

	const testData = [
		'Predictive analytics and big data',
		'Artificial\nIntelligence',
		'Cloud-based\nsolutions',
		'Internet of Things',
		'Digital Twins',
		'Mobile Apps',
		'Web Apps',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'Why Choose Us?' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const whyChooseUsContainer = driver.getByTestId(RenewableEnergy.WhyChooseUs);
	const allSectionTitles = whyChooseUsContainer.getByTestId(Container.SectionTitle);

	const testData = ['Product-oriented approach', 'Cross-domain expertise', 'Multifaceted technology experts'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles and numbers in 'Our Workflow' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const ourWorkflowContainer = driver.getByTestId(RenewableEnergy.OurWorkflow);

	await expect(ourWorkflowContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04', '05']);

	const allSectionTitles = ourWorkflowContainer.getByTestId(Container.SectionTitle);
	const testData = ['Investigation', 'Execution', 'Performance\nand Testing', 'Analysis', 'Support and\nMaintenance'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'FAQ' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const faqContainer = driver.getByTestId(RenewableEnergy.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);

	const testData = [
		'What processes are involved in developing software for renewable energy providers?',
		'What software development tools and technologies are commonly used for renewable energy software development at Techstack?',
		'What are some of the unique challenges faced by renewable energy software engineers?',
		'What trends are happening in renewable energy software development?',
		'How can software development help renewable energy providers meet their goals?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
