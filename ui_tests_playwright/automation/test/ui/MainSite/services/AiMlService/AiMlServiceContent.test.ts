import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiMlService from '../../../../../identifiers/MainSite/pages/services/AiMlService';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
});

test("Check the header from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const info = driver.getByTestId(AiMlService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nAI & ML');
	await expect(info.getByTestId(Container.Title)).toHaveText('AI & ML Application Development Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
});

test("Check the container title and number from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const containers = [
		driver.getByTestId(AiMlService.AiBeneficialImpactOnIndustries),
		driver.getByTestId(AiMlService.OurAiMlDevelopmentServices),
		driver.getByTestId(AiMlService.CaseStudies),
		driver.getByTestId(AiMlService.TheWayWeWork),
		driver.getByTestId(AiMlService.OurApproach),
		driver.getByTestId(AiMlService.TechnologyStack),
		driver.getByTestId(AiMlService.OurExperts),
		driver.getByTestId(AiMlService.RelatedServices),
		driver.getByTestId(AiMlService.GetInTouch),
		driver.getByTestId(AiMlService.RelatedArticles),
		driver.getByTestId(AiMlService.Faq),
	];

	const expectedData = [
		['AI’s Beneficial \nImpact on \nIndustries', '01'],
		['Our AI & ML \nDevelopment \nServices', '02'],
		['Case studies', '03'],
		['The Way \nWe work', '04'],
		['Our approach', '05'],
		['Technology \nstack', '06'],
		['Our Experts', '07'],
		['Related Services', '08'],
		['Get in Touch', '09'],
		['Related Articles', '10'],
		['FAQ', '11'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check statistic images in 'AI’s Beneficial Impact on Industries' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(AiMlService.AiBeneficialImpactOnIndustries);
	const allSectionTitles = await aiBeneficialImpactOnIndustriesContainer
		.getByTestId(Container.SectionTitle)
		.allInnerTexts();

	const testData = ['69\n%', '73\n%', '82\n%', '$\n13\ntrillion'];
	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check blocks and sections titles in 'Our AI & ML Development Services' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourAiMlDevelopmentServicesContainer = driver.getByTestId(AiMlService.OurAiMlDevelopmentServices);
	const containerBlocks = await ourAiMlDevelopmentServicesContainer.getByTestId(Container.ContainerBlock).all();
	const allSectionTitlesFirstBlock = await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Overview', 'Implementation\nin the real world'];

	await expect(containerBlocks[0].getByTestId(Container.BlockTitle)).toHaveText('ML models');
	expect(allSectionTitlesFirstBlock.sort()).toEqual(testData.sort());

	const allSectionTitlesSecondBlock = await containerBlocks[1].getByTestId(Container.SectionTitle).allInnerTexts();

	await expect(containerBlocks[1].getByTestId(Container.BlockTitle)).toHaveText('Deep learning');
	expect(allSectionTitlesSecondBlock.sort()).toEqual(testData.sort());

	const allSectionTitlesThirdBlock = await containerBlocks[2].getByTestId(Container.SectionTitle).allInnerTexts();

	await expect(containerBlocks[2].getByTestId(Container.BlockTitle)).toHaveText('Computer Vision');
	expect(allSectionTitlesThirdBlock.sort()).toEqual(testData.sort());

	const allSectionTitlesFourthBlock = await containerBlocks[3].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataFourthBlock = ['Overview', 'Directions', 'Implementation\nin the real world'];

	await expect(containerBlocks[3].getByTestId(Container.BlockTitle)).toHaveText('NLP');
	expect(allSectionTitlesFourthBlock.sort()).toEqual(testDataFourthBlock.sort());

	const allSectionTitlesFifthBlock = await containerBlocks[4].getByTestId(Container.SectionTitle).allInnerTexts();

	await expect(containerBlocks[4].getByTestId(Container.BlockTitle)).toHaveText('Conversational AI');
	expect(allSectionTitlesFifthBlock.sort()).toEqual(testData.sort());

	const allSectionTitlesSixthBlock = await containerBlocks[5].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataSixthBlock = ['Overview', 'Goals'];

	await expect(containerBlocks[5].getByTestId(Container.BlockTitle)).toHaveText('MLOps');
	expect(allSectionTitlesSixthBlock.sort()).toEqual(testDataSixthBlock.sort());

	const allSectionTitlesSeventhBlock = await containerBlocks[6].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataSeventhBlock = ['Overview', 'Domains\nof application'];

	await expect(containerBlocks[6].getByTestId(Container.BlockTitle)).toHaveText('Predictive analytics');
	expect(allSectionTitlesSeventhBlock.sort()).toEqual(testDataSeventhBlock.sort());
});

test("Check sections titles in 'Our approach' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourApproachContainer = driver.getByTestId(AiMlService.OurApproach);
	const allSectionTitles = await ourApproachContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Flexible AI/ML\nDevelopment',
		'Solutions for\nAny Environment',
		'Balancing\nInnovation\nand Practicality',
		'Tech community',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check sections titles in 'Technology stack' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const technologyStackContainer = driver.getByTestId(AiMlService.TechnologyStack);
	const allSectionTitles = await technologyStackContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Computer vision',
		'Deep Learning\nand Machine Learning',
		'Application',
		'Data storage\nand manipulation',
		'DevOps',
		'QA',
		'Data Visualization',
		'CI/CD',
		'Development\nEnvironment',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check member names and roles in 'Our experts' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourExpertsContainer = driver.getByTestId(AiMlService.OurExperts);
	const allMemberRoles = await ourExpertsContainer.getByTestId(Container.MemberRole).allInnerTexts();
	const testDataRoles = [
		'R&D Engineer, Software Engineering Lead,\nFinds answers for challenges related to business',
		'Data Scientist,\nIdentifies actionable insights through data analysis',
	];

	expect(allMemberRoles.sort()).toEqual(testDataRoles.sort());

	const allMemberNames = await ourExpertsContainer.getByTestId(Container.MemberName).allInnerTexts();
	const testDataNames = [ExpertNames.YevheniiKarachevtsev, ExpertNames.OleksandrBezrukov];

	expect(allMemberNames.sort()).toEqual(testDataNames.sort());
});

test("Check section titles in 'Related Services' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const relatedServicesContainer = driver.getByTestId(AiMlService.RelatedServices);
	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Big Data\n& Analytics',
		'Custom software\ndevelopment',
		'UX/UI Design',
		'Development\nconsulting',
		'Internet of Things',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'FAQ' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const faqContainer = driver.getByTestId(AiMlService.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'What are the benefits of\nimplementing AI and ML\nin my business?',
		'How long does it take to\ndevelop an AI/ML solution?',
		'What kind of data do I need to provide for AI and ML development?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
