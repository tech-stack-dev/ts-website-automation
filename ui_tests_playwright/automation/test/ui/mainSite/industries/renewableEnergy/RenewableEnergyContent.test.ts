import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import RenewableEnergy from '../../../../../identifiers/mainSite/pages/industries/RenewableEnergy';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {arrayUtils} from '../../../../../utils/ArrayUtils';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test(
	qase(
		5272,
		'Check Info container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const info = driver.getByTestId(RenewableEnergy.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nRenewable Energy');
		await expect(info.getByTestId(Container.Title)).toHaveText(
			'Software Development for the Renewable Energy Industry'
		);
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomProjectQuote)).toHaveText(
			'Get your custom project quote'
		);
	}
);

test(
	qase(
		5286,
		'Check the container title and number from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const containers = [
			driver.getByTestId(RenewableEnergy.WhatResultsCanYouExpect),
			driver.getByTestId(RenewableEnergy.WhoWeServe),
			driver.getByTestId(RenewableEnergy.TechstackInNumbers),
			driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ),
			driver.getByTestId(RenewableEnergy.CaseStudy),
			driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise),
			driver.getByTestId(RenewableEnergy.WhyChooseUs),
			driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack),
			driver.getByTestId(RenewableEnergy.OurWorkflow),
			driver.getByTestId(RenewableEnergy.GetInTouch),
			driver.getByTestId(RenewableEnergy.RelatedArticles),
			driver.getByTestId(RenewableEnergy.Faq),
		];

		const expectedData = [
			['What Results Can You Expect with Our Expertise in Industry?', '01'],
			['Who We Serve', '02'],
			['Techstack in Numbers', '03'],
			['Renewable Energy Software Development Services', '04'],
			['Case Study by Techstack', '06'],
			['Our Key Areas of Expertise in Renewable Energy', '07'],
			['Why Choose Us?', '08'],
			['How We Operate at Techstack', '09'],
			['Our Workflow', '10'],
			['Request a Free No-obligation Quote', '11'],
			['Related Articles', '12'],
			['FAQ', '13'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5592,
		'Check block titles in "What Results Can You Expect with Our Expertise in Industry?" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const WhatResultsCanYouExpectContainer = driver.getByTestId(RenewableEnergy.WhatResultsCanYouExpect);
		const allBlockTitles = WhatResultsCanYouExpectContainer.getByTestId(Container.SectionNumber);
		const testData = ['01', '02', '03', '04'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5281,
		'Check block titles in "Techstack in Numbers" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const techstackInNumbersContainer = driver.getByTestId(RenewableEnergy.TechstackInNumbers);
		const allBlockTitles = techstackInNumbersContainer.getByTestId(Container.BlockTitle);
		const testData = ['10\nyears', '20\nexperts', '91\n%', '5.0'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		5291,
		'Check section titles and numbers in "Who We Serve" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const whoWeServeContainer = driver.getByTestId(RenewableEnergy.WhoWeServe);

		await expect(whoWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04']);

		const allSectionTitles = whoWeServeContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Industry service companies',
			'Renewable energy producers and distributors',
			'EV charging providers',
			'Industrial manufacturers',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5300,
		'Check block titles, section titles and CTA button in "Renewable Energy Software Development Services" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const renewableEnergySoftDevServContainer = driver.getByTestId(RenewableEnergy.RenewableEnergySoftDevServ);
		const allBlockTitles = renewableEnergySoftDevServContainer.getByTestId(Container.BlockTitle);
		const testDataBlockTitles = [
			'Domain-Specific Software for the Renewable Energy Industry',
			'Energy Management Systems',
			'Energy Infrastructure and Analysis',
		];
		await expect(allBlockTitles).toHaveText(testDataBlockTitles);

		const containerBlocks = await renewableEnergySoftDevServContainer.getByTestId(Container.ContainerBlock).all();
		const testDataSectionTitles = ['Overview', 'Implementation in the real world'];

		for (const block of containerBlocks) {
			const sectionTitles = block.getByTestId(Container.SectionTitle);
			await expect(sectionTitles).toHaveText(testDataSectionTitles);
		}

		await expect(renewableEnergySoftDevServContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		5305,
		'Check section titles, block title, image and CTA button in "Case Study by Techstack" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(RenewableEnergy.CaseStudy);
		const containerBlock = caseStudyContainer.getByTestId(Container.ContainerBlock);

		await expect(containerBlock.getByTestId(Container.BlockTitle)).toHaveText('Solar Energy Data Portal');

		const sectionIndexes = await containerBlock.getByTestId(Container.SectionNumber).allInnerTexts();
		const sectionTitles = await containerBlock.getByTestId(Container.SectionTitle).allInnerTexts();
		const actualIndexesAndTitles = arrayUtils.mergeTwoArraysToMap(sectionIndexes, sectionTitles);

		const expectedIndexesAndTitles: Map<string, string> = new Map([
			['01', 'Enables real-time monitoring of solar energy production and consumption'],
			['02', 'Normalizes data from different sources for accurate analysis and forecasting'],
			['03', 'Streamlines operations and enhances decision-making processes'],
		]);

		expect(actualIndexesAndTitles).toEqual(expectedIndexesAndTitles);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.SolarEnergy)).toBeVisible();
		await expect(caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		5308,
		'Check section titles in "Our Key Areas of Expertise in Renewable Energy" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const ourKeyAreasOfExpertiseContainer = driver.getByTestId(RenewableEnergy.OurKeyAreasOfExpertise);
		const allSectionTitles = ourKeyAreasOfExpertiseContainer.getByTestId(Container.SectionTitle);

		const testData = [
			'Predictive analytics and big data',
			'Artificial Intelligence',
			'Cloud-based solutions',
			'Internet of Things',
			'Digital Twins',
			'Mobile Apps',
			'Web Apps',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5313,
		'Check section titles in "Why Choose Us?" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const whyChooseUsContainer = driver.getByTestId(RenewableEnergy.WhyChooseUs);
		const allSectionTitles = whyChooseUsContainer.getByTestId(Container.SectionTitle);

		const testData = ['Product-oriented approach', 'Cross-domain expertise', 'Multifaceted technology experts'];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5316,
		'Check carousel sections and CTA button in "How We Operate at Techstack" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const howWeOperateContainer = driver.getByTestId(RenewableEnergy.HowWeOperateAtTechstack);
		const carousel = howWeOperateContainer.getByTestId(Container.ContainerCarousel);

		await expect(carousel.getByTestId(Container.SectionNumber)).toHaveText([
			'Step 1',
			'Step 2',
			'Step 3',
			'Step 4',
		]);

		const allSectionTitles = carousel.getByTestId(Container.SectionTitle);
		const testData = ['Make contact', 'Speak with a tech expert', 'Making a proposal', 'Contract signing'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(howWeOperateContainer.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
	}
);

test(
	qase(
		5319,
		'Check section titles and numbers in "Our Workflow" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
		const ourWorkflowContainer = driver.getByTestId(RenewableEnergy.OurWorkflow);

		await expect(ourWorkflowContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = ourWorkflowContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Investigation',
			'Execution',
			'Performance and Testing',
			'Analysis',
			'Support and Maintenance',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5325,
		'Check section titles in "FAQ" container from the "Renewable Energy" page @desktop @mobile @Regression @RenewableEnergy @TSWEB-957'
	),
	async () => {
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
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
