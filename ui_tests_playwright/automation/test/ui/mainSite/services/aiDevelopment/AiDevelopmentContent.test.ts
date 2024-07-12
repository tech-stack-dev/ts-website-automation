import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiDevelopment from '../../../../../identifiers/mainSite/pages/services/AiDevelopment';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteImages from '../../../../../identifiers/mainSite/MainSiteImages';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import TechnologyStackData from '../../../../../preconditionsData/technologyStack/TechnologyStackData';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiDevelopment));
});

test(
	qase(
		4826,
		'Check the Info container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const info = driver.getByTestId(AiDevelopment.Info);
		await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nAI');
		await expect(info.getByTestId(Container.Title)).toHaveText('AI Development Services');
		await expect(info.getByTestId(MainSiteButtons.GetYourCustomAiQuote)).toHaveText('Get your custom AI quote');
	}
);

test(
	qase(
		4845,
		'Check the container titles and numbers from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const containers = [
			driver.getByTestId(AiDevelopment.WhatResultsCanYouExpect),
			driver.getByTestId(AiDevelopment.OurAiDevelopmentServices),
			driver.getByTestId(AiDevelopment.TechnologyStack),
			driver.getByTestId(AiDevelopment.CaseStudy),
			driver.getByTestId(AiDevelopment.IndustriesWeServe),
			driver.getByTestId(AiDevelopment.AiBeneficialImpactOnIndustries),
			driver.getByTestId(AiDevelopment.WhyPartnerWithUs),
			driver.getByTestId(AiDevelopment.TheWayWeWork),
			driver.getByTestId(AiDevelopment.OurApproach),
			driver.getByTestId(AiDevelopment.CustomAiSolutions),
			driver.getByTestId(AiDevelopment.AiDevServToDeliverBusinessValue),
			driver.getByTestId(AiDevelopment.RelatedServices),
			driver.getByTestId(AiDevelopment.GetInTouch),
			driver.getByTestId(AiDevelopment.RelatedArticles),
			driver.getByTestId(AiDevelopment.Faq),
		];

		const expectedData = [
			['What Results Can You Expect with Our AI Expertise?', '01'],
			['Our AI Development Services', '02'],
			['Technology Stack', '03'],
			['Case Study by Techstack', '04'],
			['Industries We Deliver AI Development Services To', '05'],
			['AI’s Beneficial Impact on Industries', '06'],
			['Why Partner with Techstack for Custom AI Development Services', '07'],
			['The Way We Work', '08'],
			['Our Approach', '09'],
			['Custom AI Solutions We Can Build', '10'],
			['AI Development Services to Deliver Real Business Value', '11'],
			['Related Services', '12'],
			['Request a Free No-obligation Quote', '13'],
			['Related Articles', '14'],
			['FAQ', '15'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5604,
		'Check block titles in "What Results Can You Expect with Our AI Expertise?" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const WhatResultsCanYouExpectContainer = driver.getByTestId(AiDevelopment.WhatResultsCanYouExpect);
		const allBlockTitles = WhatResultsCanYouExpectContainer.getByTestId(Container.SectionNumber);
		const testData = ['01', '02', '03', '04'];

		await expect(allBlockTitles).toHaveText(testData);
	}
);

test(
	qase(
		4831,
		'Check section titles in "AI’s Beneficial Impact on Industries" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(
			AiDevelopment.AiBeneficialImpactOnIndustries
		);
		const allSectionTitles = aiBeneficialImpactOnIndustriesContainer.getByTestId(Container.SectionTitle);

		const testData = ['69\n%', '73\n%', '82\n%', '$\n13\ntrillion'];
		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4852,
		'Check block and section titles, and CTA in "Our AI Development Services" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const ourAiMlDevelopmentServicesContainer = driver.getByTestId(AiDevelopment.OurAiDevelopmentServices);
		const containerBlocks = ourAiMlDevelopmentServicesContainer.getByTestId(Container.ContainerBlock);
		const allSectionTitlesFirstBlock = containerBlocks.nth(0).getByTestId(Container.SectionTitle);
		const testData = ['Overview', 'Implementation in the real world'];

		await expect(containerBlocks.nth(0).getByTestId(Container.BlockTitle)).toHaveText('ML models');
		await expect(allSectionTitlesFirstBlock).toHaveText(testData);

		const allSectionTitlesSecondBlock = containerBlocks.nth(1).getByTestId(Container.SectionTitle);

		await expect(containerBlocks.nth(1).getByTestId(Container.BlockTitle)).toHaveText('Deep learning');
		await expect(allSectionTitlesSecondBlock).toHaveText(testData);

		const allSectionTitlesThirdBlock = containerBlocks.nth(2).getByTestId(Container.SectionTitle);

		await expect(containerBlocks.nth(2).getByTestId(Container.BlockTitle)).toHaveText('Computer Vision');
		await expect(allSectionTitlesThirdBlock).toHaveText(testData);

		const allSectionTitlesFourthBlock = containerBlocks.nth(3).getByTestId(Container.SectionTitle);
		const testDataFourthBlock = ['Overview', 'Directions', 'Implementation in the real world'];

		await expect(containerBlocks.nth(3).getByTestId(Container.BlockTitle)).toHaveText(
			'Natural language processing (NLP)'
		);
		await expect(allSectionTitlesFourthBlock).toHaveText(testDataFourthBlock);

		const allSectionTitlesFifthBlock = containerBlocks.nth(4).getByTestId(Container.SectionTitle);

		await expect(containerBlocks.nth(4).getByTestId(Container.BlockTitle)).toHaveText('Conversational AI');
		await expect(allSectionTitlesFifthBlock).toHaveText(testData);

		const allSectionTitlesSixthBlock = containerBlocks.nth(5).getByTestId(Container.SectionTitle);
		const testDataSixthBlock = ['Overview', 'Domains of application'];

		await expect(containerBlocks.nth(5).getByTestId(Container.BlockTitle)).toHaveText('Predictive analytics');
		await expect(allSectionTitlesSixthBlock).toHaveText(testDataSixthBlock);

		const allSectionTitlesSeventhBlock = containerBlocks.nth(6).getByTestId(Container.SectionTitle);
		const testDataSeventhBlock = ['Overview', 'Implementation in the real world'];

		await expect(containerBlocks.nth(6).getByTestId(Container.BlockTitle)).toHaveText('OpenAI API integration');
		await expect(allSectionTitlesSeventhBlock).toHaveText(testDataSeventhBlock);

		await expect(ourAiMlDevelopmentServicesContainer.getByTestId(MainSiteButtons.GetYourQuoteNow)).toHaveText(
			'Get your quote now'
		);
	}
);

test(
	qase(
		4865,
		'Check section titles in "Technology stack" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const technologyStackContainer = driver.getByTestId(AiDevelopment.TechnologyStack);
		const allSectionTitles = technologyStackContainer.getByTestId(Container.SectionTitle);
		const testData = TechnologyStackData.AiMLDataScieceTab;

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4870,
		'Check section titles, image and CTA in "Case Study by Techstack" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(AiDevelopment.CaseStudy);
		const allSectionTitles = caseStudyContainer.getByTestId(Container.SectionTitle);
		const testData = ['Seamless integration into existing software system', 'Security and data integrity'];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(caseStudyContainer.getByTestId(MainSiteImages.IncorporatingAiMl)).toBeVisible();
		await expect(caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt)).toHaveText(
			'Check out how we build it'
		);
	}
);

test(
	qase(
		4877,
		'Check section numbers and titles, and CTA button in "Industries We Deliver AI Development Services To" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(AiDevelopment.IndustriesWeServe);
		await expect(industriesWeServeContainer.getByTestId(Container.SectionNumber)).toHaveText([
			'01',
			'02',
			'03',
			'04',
			'05',
		]);

		const allSectionTitles = industriesWeServeContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Manufacturing',
			'Healthcare',
			'Renewable energy',
			'Transportation and logistics',
			'Digital transformation',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(industriesWeServeContainer.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote)).toHaveText(
			'Get your industry-specific quote'
		);
	}
);

test(
	qase(
		5605,
		'Check section titles in "Why Partner with Techstack for Custom AI Development Services" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const whyPartnerWithUsContainer = driver.getByTestId(AiDevelopment.WhyPartnerWithUs);
		const allSectionTitles = whyPartnerWithUsContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Tailored solutions',
			'Competitive advantage',
			'Seamless integration',
			'Scalability and flexibility',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4881,
		'Check carousel section numbers and titles in "The Way We Work" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const theWayWeWorkContainer = driver.getByTestId(AiDevelopment.TheWayWeWork);
		const carouselSections = theWayWeWorkContainer.getByTestId(Container.CarouselSection);

		await expect(carouselSections.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04', '05']);

		const carouselSectionTitles = carouselSections.getByTestId(Container.SectionTitle);
		const testData = [
			'Discovery and Research',
			'Build POC',
			'Tuning and adjustments',
			'Build Product',
			'Release and Maintanence',
		];

		await expect(carouselSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4888,
		'Check section titles and CTA in "Our Approach" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(AiDevelopment.OurApproach);
		const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Flexible AI development',
			'Solutions for any environment',
			'Balancing innovation and practicality',
			'Tech community',
		];

		await expect(allSectionTitles).toHaveText(testData);

		await expect(ourApproachContainer.getByTestId(MainSiteButtons.GetAQuote)).toHaveText('Get a quote');
	}
);

test(
	qase(
		5606,
		'Check carousel section numbers and titles in "Custom AI Solutions We Can Build" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const customAiSolutionsContainer = driver.getByTestId(AiDevelopment.CustomAiSolutions);
		const carouselSections = customAiSolutionsContainer.getByTestId(Container.CarouselSection);

		await expect(carouselSections.getByTestId(Container.SectionNumber)).toHaveText(['01', '02', '03', '04', '05', '06']);

		const carouselSectionTitles = carouselSections.getByTestId(Container.SectionTitle);
		const testData = [
			'Natural Language Processing solutions',
			'Recommendation systems',
			'Predictive analytics',
			'Computer vision solutions',
			'Intelligent automation solutions',
			'Fraud detection and risk assessment systems',
		];

		await expect(carouselSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		5607,
		'Check section titles in "AI Development Services to Deliver Real Business Value" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const aiDevServToDeliverBusinessValueContainer = driver.getByTestId(AiDevelopment.AiDevServToDeliverBusinessValue);
		const allSectionTitles = aiDevServToDeliverBusinessValueContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Team augmentation',
			'End-to-end product development',
			'Tech advisory and consulting services',
			'Scalability and flexibility',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4901,
		'Check section titles in "Related Services" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(AiDevelopment.RelatedServices);
		const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'Big Data & Analytics',
			'Custom software development',
			'UX/UI Design',
			'Development consulting',
			'Internet of Things',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test(
	qase(
		4895,
		'Check section titles in "FAQ" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const faqContainer = driver.getByTestId(AiDevelopment.Faq);
		const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
		const testData = [
			'What are the benefits of implementing AI in my business?',
			'How long does it take to develop an AI solution?',
			'How to choose an AI software development company?',
			'What kind of data do I need to provide to get started with artificial intelligence app development services?',
		];

		await expect(allSectionTitles).toHaveText(testData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
