import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import TransportationAndLogistics from '../../../../../identifiers/mainSite/pages/industries/TransportationAndLogistics';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
});

test(
	qase(
		5334,
		'Check Info container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const info = driver.getByTestId(TransportationAndLogistics.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nTransportation and Logistics');
		await expect(info.getByTestId(Container.Title)).toHaveText('Transportation and Logistics Software Development');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomProjectQuote)).toHaveText(
			`Get your custom project quote`
		);
	}
);

test(
	qase(
		5341,
		'Check the container title and number from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const containers = [
			driver.getByTestId(TransportationAndLogistics.WhatResultsCanYouExpect),
			driver.getByTestId(TransportationAndLogistics.WhoWeServe),
			driver.getByTestId(TransportationAndLogistics.TransportAndLogisticsSoftDevServ),
			driver.getByTestId(TransportationAndLogistics.CaseStudy),
			driver.getByTestId(TransportationAndLogistics.TechstackInNumbers),
			driver.getByTestId(TransportationAndLogistics.OurExpertise),
			driver.getByTestId(TransportationAndLogistics.WhatMakesOurTeamDifferent),
			driver.getByTestId(TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack),			
			driver.getByTestId(TransportationAndLogistics.OurWorkflow),
			driver.getByTestId(TransportationAndLogistics.GetInTouch),
			driver.getByTestId(TransportationAndLogistics.RelatedArticles),
			driver.getByTestId(TransportationAndLogistics.Faq),
		];

		const expectedData = [
			['What Results Can You Expect with Our Expertise in Industry?', '01'],
			['Who We Serve', '02'],
			['Transportation and Logistics Software Development Services at Techstack', '03'],
			['Case Study by Techstack', '04'],
			['Techstack in Numbers', '05'],
			['Our Expertise in Logistics Software Development Solutions', '06'],
			['What Makes Us Different', '07'],
			['Transportation and Logistics Software Development at Techstack', '08'],
			['Development Workflow That We Follow', '09'],
			['Request a Free No-obligation Quote', '10'],
			['Related Articles', '11'],
			['FAQ', '12'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5593,
		'Check block titles in "What Results Can You Expect with Our Expertise in Industry?" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const WhatResultsCanYouExpectContainer = driver.getByTestId(TransportationAndLogistics.WhatResultsCanYouExpect);
		const allBlockTitles = WhatResultsCanYouExpectContainer.getByTestId(Container.BlockTitle);
		const testData = ['01', '02', '03', '04'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5342,
		'Check block titles in "Techstack in Numbers" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const techstackInNumbersContainer = driver.getByTestId(TransportationAndLogistics.TechstackInNumbers);
		const allBlockTitles = techstackInNumbersContainer.getByTestId(Container.BlockTitle);
		const testData = ['11\ntech specialists', '10\nyear-long', '91\n%', '67\n%'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5344,
		'Check section titles and numbers, and CTA button in "Who We Serve" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
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
			'Delivery and courier service companies',
			'Digital logistics providers',
			'Retailers and eCommerce',
			'Car rental companies',
			'3PL and 4PL providers',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(whoWeServeContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText('Get your quote now');
	}
);

test(
	qase(
		5346,
		'Check section titles in "Transportation and Logistics Software Development Services at Techstack" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
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
	}
);

test(
	qase(
		5349,
		'Check section titles, image and CTA button in "Case Study by Techstack" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudy);

		const allSectionTitles = caseStudyByTechstackContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Web-based bidding process',
			'Bid processing and validation',
			'Determination of winning bids',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(caseStudyByTechstackContainer.getByTestId(MainSiteImages.CaseStudy)).toBeVisible();
		await expect(caseStudyByTechstackContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5351,
		'Check section titles in "Our Expertise in Logistics Software Development Solutions" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const ourExpertiseInLogisticsSoftDevSolutionsContainer = driver.getByTestId(
			TransportationAndLogistics.OurExpertise
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
	}
);

test(
	qase(
		5353,
		'Check section titles in "What Makes Us Different" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const whatMakesUsDifferentContainer = driver.getByTestId(TransportationAndLogistics.WhatMakesOurTeamDifferent);

		const allSectionTitles = whatMakesUsDifferentContainer.getByTestId(Container.SectionTitle);
		const testData = ['Product-first approach', 'End-to-end development', 'Expert technology advice'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5355,
		'Check carousel sections and CTA button in "Transportation and Logistics Software Development at Techstack" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const transportationAndLogisticsContainer = driver.getByTestId(
			TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack
		);
		const carousel = transportationAndLogisticsContainer.getByTestId(Container.ContainerCarousel);

		await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText([
			'Step 1',
			'Step 2',
			'Step 3',
			'Step 4',
		]);

		const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
		const testData = ['Make contact', 'Meet a tech specialist', 'Discuss the terms', 'Sign the contract'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(transportationAndLogisticsContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText(
			'Request a quote'
		);
	}
);

test(
	qase(
		5357,
		'Check section titles and numbers in "Development Workflow That We Follow" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const developmentWorkflowThatWeFollowContainer = driver.getByTestId(TransportationAndLogistics.OurWorkflow);

		const allSectionTitles = developmentWorkflowThatWeFollowContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Investigation',
			'Execution',
			'Performance and Testing',
			'Analysis',
			'Support and Maintenance',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(developmentWorkflowThatWeFollowContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);
	}
);

test(
	qase(
		5359,
		'Check section titles in "FAQ" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const faqContainer = driver.getByTestId(TransportationAndLogistics.Faq);

		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'How can Techstack help transport and logistics companies?',
			'What types of logistics businesses can Techstack help?',
			'What are some best practices for logistics software development at Techstack?',
			'How much does it cost to build custom logistics software with Techstack?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
