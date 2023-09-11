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
	const containers = [
		driver.getByTestId(TransportationAndLogistics.TechstackInNumbers),
		driver.getByTestId(TransportationAndLogistics.WhoWeServe),
		driver.getByTestId(TransportationAndLogistics.TransportAndLogisticsSoftDevServ),
		driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack),
		driver.getByTestId(TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions),
		driver.getByTestId(TransportationAndLogistics.WhatMakesUsDifferent),
		driver.getByTestId(TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack),
		driver.getByTestId(TransportationAndLogistics.DevelopmentWorkflowThatWeFollow),
		driver.getByTestId(TransportationAndLogistics.GetInTouch),
		driver.getByTestId(TransportationAndLogistics.Faq),
	];

	const expectedData = [
		['Techstack in Numbers', '01'],
		['Who We Serve', '02'],
		['Transportation and Logistics\nSoftware Development\nServices at Techstack', '03'],
		['Case Study by Techstack', '04'],
		['Our Expertise in Logistics\nSoftware Development\nSolutions', '05'],
		['What Makes Us\nDifferent', '06'],
		['Transportation and Logistics\nSoftware Development at\nTechstack', '07'],
		['Development\nWorkflow That We\nFollow', '08'],
		['Get in Touch', '09'],
		['FAQ', '10'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check block titles in 'Techstack in Numbers' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const techstackInNumbersContainer = driver.getByTestId(TransportationAndLogistics.TechstackInNumbers);
	const allBlockTitles = techstackInNumbersContainer.getByTestId(Container.BlockTitle);
	const testData = ['11\ntech specialists', '9\nyear-long', '91\n%', '67\n%'];

	await expect(allBlockTitles).toHaveText(testData);
});

test("Check section titles and numbers in 'Who We Serve' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const whoWeServeContainer = driver.getByTestId(TransportationAndLogistics.WhoWeServe);
	await expect(whoWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	const allSectionTitles = whoWeServeContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Carriers and shippers',
		'Delivery and courier\nservice companies',
		'Digital logistics providers',
		'Retailers and eCommerce',
		'Car rental companies',
		'3PL and 4PL providers',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'Transportation and Logistics Software Development Services at Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const transportAndLogisticsSoftDevServContainer = driver.getByTestId(
		TransportationAndLogistics.TransportAndLogisticsSoftDevServ
	);

	const allSectionTitles = transportAndLogisticsSoftDevServContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Shipping management',
		'Fleet management',
		'Freight management',
		'Order management',
		'Warehouse management',
		'Supply chain management',
		'Data analytics',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles, image and CTA button in 'Case Study by Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack);

	const allSectionTitles = caseStudyByTechstackContainer.getByTestId(Container.SectionTitle);
	const testData = ['Web-based bidding process', 'Bid processing and validation', 'Determination of winning bids'];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(caseStudyByTechstackContainer.getByTestId(MainSiteImages.CaseStudy)).toBeVisible();
	await expect(caseStudyByTechstackContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy)).toBeVisible();
});

test("Check section titles in 'Our Expertise in Logistics Software Development Solutions' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const ourExpertiseInLogisticsSoftDevSolutionsContainer = driver.getByTestId(
		TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions
	);

	const allSectionTitles = ourExpertiseInLogisticsSoftDevSolutionsContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Predictive analytics and big data',
		'AI and ML',
		'Cloud-based solutions',
		'IoT',
		'DevSecOps',
		'Mobile Apps',
		'Web Apps',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'What Makes Us Different' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const whatMakesUsDifferentContainer = driver.getByTestId(TransportationAndLogistics.WhatMakesUsDifferent);

	const allSectionTitles = whatMakesUsDifferentContainer.getByTestId(Container.SectionTitle);
	const testData = ['Product-first approach', 'End-to-end development', 'Expert technology advice'];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles and numbers in 'Development Workflow That We Follow' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const developmentWorkflowThatWeFollowContainer = driver.getByTestId(
		TransportationAndLogistics.DevelopmentWorkflowThatWeFollow
	);

	const allSectionTitles = developmentWorkflowThatWeFollowContainer.getByTestId(Container.SectionTitle);
	const testData = ['Investigation', 'Execution', 'Performance\nand Testing', 'Analysis', 'Support and\nMaintenance'];

	await expect(allSectionTitles).toHaveText(testData);

	await expect(developmentWorkflowThatWeFollowContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);
});

test("Check section titles in 'FAQ' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const faqContainer = driver.getByTestId(TransportationAndLogistics.Faq);

	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'How can Techstack help transport and logistics companies?',
		'What types of logistics businesses can Techstack help?',
		'What are some best practices for logistics software development at Techstack?',
		'How much does it cost to build custom logistics software with Techstack?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
