import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/MainSite/MainSiteImages';
import TransportationAndLogistics from '../../../../../identifiers/MainSite/pages/industries/TransportationAndLogistics';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
});

test("Check the header from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const info = driver.getByTestId(TransportationAndLogistics.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nTransportation and Logistics');
	await expect(info.getByTestId(Container.Title)).toHaveText('Transportation and\nLogistics Software\nDevelopment');
	await expect(info.getByTestId(MainSiteButtons.LetsDiscuss)).toBeVisible();
});

test("Check the container title and number from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	await expect(
		driver.getByTestId(TransportationAndLogistics.TechstackInNumbers).getByTestId(Container.ContainerTitle)
	).toHaveText('Techstack in Numbers');
	await expect(
		driver.getByTestId(TransportationAndLogistics.TechstackInNumbers).getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(
		driver.getByTestId(TransportationAndLogistics.WhoWeServe).getByTestId(Container.ContainerTitle)
	).toHaveText('Who We Serve');
	await expect(
		driver.getByTestId(TransportationAndLogistics.WhoWeServe).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(
		driver
			.getByTestId(TransportationAndLogistics.TransportAndLogisticsSoftDevServ)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Transportation and Logistics\nSoftware Development\nServices at Techstack');
	await expect(
		driver
			.getByTestId(TransportationAndLogistics.TransportAndLogisticsSoftDevServ)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(
		driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack).getByTestId(Container.ContainerTitle)
	).toHaveText('Case Study by Techstack');
	await expect(
		driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver
			.getByTestId(TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Our Expertise in Logistics\nSoftware Development\nSolutions');
	await expect(
		driver
			.getByTestId(TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(
		driver.getByTestId(TransportationAndLogistics.WhatMakesUsDifferent).getByTestId(Container.ContainerTitle)
	).toHaveText('What Makes Us\nDifferent');
	await expect(
		driver.getByTestId(TransportationAndLogistics.WhatMakesUsDifferent).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(
		driver
			.getByTestId(TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Transportation and Logistics\nSoftware Development at\nTechstack');
	await expect(
		driver
			.getByTestId(TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('07');

	await expect(
		driver
			.getByTestId(TransportationAndLogistics.DevelopmentWorkflowThatWeFollow)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Development\nWorkflow That We\nFollow');
	await expect(
		driver
			.getByTestId(TransportationAndLogistics.DevelopmentWorkflowThatWeFollow)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('08');

	await expect(driver.getByTestId(TransportationAndLogistics.Faq).getByTestId(Container.ContainerTitle)).toHaveText(
		'FAQ'
	);
	await expect(driver.getByTestId(TransportationAndLogistics.Faq).getByTestId(Container.ContainerNumber)).toHaveText(
		'09'
	);
});

test("Check block titles in 'Techstack in Numbers' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const techstackInNumbersContainer = driver.getByTestId(TransportationAndLogistics.TechstackInNumbers);
	const allBlockTitles = await techstackInNumbersContainer.getByTestId(Container.BlockTitle).allInnerTexts();
	const testData = ['11\ntech specialists', '9\nyear-long', '91\n%', '67\n%'];

	expect(allBlockTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and numbers in 'Who We Serve' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const whoWeServeContainer = driver.getByTestId(TransportationAndLogistics.WhoWeServe);
	expect(await whoWeServeContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	const allSectionTitles = await whoWeServeContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Carriers and shippers',
		'Delivery and courier\nservice companies',
		'Digital logistics providers',
		'Retailers and eCommerce',
		'Car rental companies',
		'3PL and 4PL providers',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'Transportation and Logistics Software Development Services at Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const transportAndLogisticsSoftDevServContainer = driver.getByTestId(
		TransportationAndLogistics.TransportAndLogisticsSoftDevServ
	);

	const allSectionTitles = await transportAndLogisticsSoftDevServContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = [
		'Shipping management',
		'Fleet management',
		'Freight management',
		'Order management',
		'Warehouse management',
		'Supply chain management',
		'Data analytics',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles, image and CTA button in 'Case Study by Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack);

	const allSectionTitles = await caseStudyByTechstackContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Web-based bidding process', 'Bid processing and validation', 'Determination of winning bids'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	await expect(caseStudyByTechstackContainer.getByTestId(MainSiteImages.CaseStudy)).toBeVisible();
	await expect(caseStudyByTechstackContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy)).toBeVisible();
});

test("Check section titles in 'Our Expertise in Logistics Software Development Solutions' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const ourExpertiseInLogisticsSoftDevSolutionsContainer = driver.getByTestId(
		TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions
	);

	const allSectionTitles = await ourExpertiseInLogisticsSoftDevSolutionsContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = [
		'Predictive analytics and big data',
		'AI and ML',
		'Cloud-based solutions',
		'IoT',
		'DevSecOps',
		'Mobile Apps',
		'Web Apps',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'What Makes Us Different' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const whatMakesUsDifferentContainer = driver.getByTestId(TransportationAndLogistics.WhatMakesUsDifferent);

	const allSectionTitles = await whatMakesUsDifferentContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Product-first approach', 'End-to-end development', 'Expert technology advice'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and numbers in 'Development Workflow That We Follow' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const developmentWorkflowThatWeFollowContainer = driver.getByTestId(
		TransportationAndLogistics.DevelopmentWorkflowThatWeFollow
	);

	const allSectionTitles = await developmentWorkflowThatWeFollowContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();
	const testData = ['Investigation', 'Execution', 'Performance\nand Testing', 'Analysis', 'Support and\nMaintenance'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	expect(await developmentWorkflowThatWeFollowContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual(
		['01', '02', '03', '04', '05']
	);
});

test("Check section titles in 'FAQ' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const faqContainer = driver.getByTestId(TransportationAndLogistics.Faq);

	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'How can Techstack help transport and logistics companies?',
		'What types of logistics businesses can Techstack help?',
		'What are some best practices for logistics software development at Techstack?',
		'How much does it cost to build custom logistics software with Techstack?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
