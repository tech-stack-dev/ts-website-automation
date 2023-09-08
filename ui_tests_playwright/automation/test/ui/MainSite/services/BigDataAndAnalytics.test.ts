import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import Container from '../../../../identifiers/Container';
import BigDataAndAnalytics from '../../../../identifiers/MainSite/pages/services/BigDataAndAnalytics';
import Buttons from '../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertNames} from '../../../../preconditionsData/ExpertNames';
import {ExpertsLinkedInLinks} from '../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {Environment} from '../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
});

test("Check the header from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const info = driver.getByTestId(BigDataAndAnalytics.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nBig Data & Analytics');
	await expect(info.getByTestId(Container.Title)).toHaveText('Big Data Application\nDevelopment Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
});

test("Check the container title and number from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const containers = [
		driver.getByTestId(BigDataAndAnalytics.HowBigDataWillHelpYou),
		driver.getByTestId(BigDataAndAnalytics.BigDataSoftwareDevelopmentWithTechstack),
		driver.getByTestId(BigDataAndAnalytics.BigDataSolutionsTechnologyStack),
		driver.getByTestId(BigDataAndAnalytics.BigDataCaseStudies),
		driver.getByTestId(BigDataAndAnalytics.IndustrySpecificBigDataSolutions),
		driver.getByTestId(BigDataAndAnalytics.WhyChooseTechstackBigDataServices),
		driver.getByTestId(BigDataAndAnalytics.OurExperts),
		driver.getByTestId(BigDataAndAnalytics.RelatedServices),
		driver.getByTestId(BigDataAndAnalytics.GetInTouch),
		driver.getByTestId(BigDataAndAnalytics.RelatedArticles),
		driver.getByTestId(BigDataAndAnalytics.Faq),
	];

	const expectedData = [
		['How Big Data\nWill Help You', '01'],
		['Big Data Software Development With Techstack', '02'],
		['Big Data Solutions\nTechnology Stack', '03'],
		['Big Data Case Studies', '04'],
		['Industry-specific Big Data Solutions', '05'],
		['Why Choose Techstack’s Big Data Software Development Services?', '06'],
		['Our Experts', '07'],
		['Related Services', '08'],
		['Get in Touch', '09'],
		['Related Articles', '10'],
		['FAQ', '11'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check section number and section title in 'How Big Data Will Help You' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const howBigDataWillHelpYouContainer = driver.getByTestId(BigDataAndAnalytics.HowBigDataWillHelpYou);
	const allSectionTitles = howBigDataWillHelpYouContainer.getByTestId(Container.SectionTitle);
	const testData = ['Monetize data', 'Personalize experiences', 'Improve efficiency', 'Evaluate opportunities'];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(howBigDataWillHelpYouContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
	]);
});

test("Check section title in 'Big Data Software Development With Techstack' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const bigDataWithTechstackContainer = driver.getByTestId(
		BigDataAndAnalytics.BigDataSoftwareDevelopmentWithTechstack
	);
	const allSectionTitles = bigDataWithTechstackContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Data infrastructure and engineering',
		'Real-time data analytics',
		'Predictive analytics',
		'Task Automation',
		'Data visualization',
		'Analytics integration',
		'Consulting Services',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section title in 'Big Data Solutions Technology Stack' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const bigDataTechnologyStackContainer = driver.getByTestId(BigDataAndAnalytics.BigDataSolutionsTechnologyStack);
	const allSectionTitles = bigDataTechnologyStackContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Computer vision',
		'Deep learning\nand machine learning',
		'Data ingestion\nand manipulation',
		'Data visualization',
		'Data storage',
		'Development\nenvironment',
		'Cloud',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section title and award cards in 'Why Choose Techstack’s Big Data Software Development Services?' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const whyChooseTechstackBigDataServicesContainer = driver.getByTestId(
		BigDataAndAnalytics.WhyChooseTechstackBigDataServices
	);
	const allSectionTitles = whyChooseTechstackBigDataServicesContainer.getByTestId(Container.SectionTitle);
	const testData = ['Product ownership', 'Domain proficiency', 'Tech community'];

	await expect(allSectionTitles).toHaveText(testData);

	const awardCards = whyChooseTechstackBigDataServicesContainer.getByTestId(Container.AwardCard);
	const numberOfCards = 2;
	await baseDriverSteps.checkImagesVisibility(awardCards, numberOfCards);
});

test("Check redirect to clutch in 'Why Choose Techstack’s Big Data Software Development Services?' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const whyChooseTechstackBigDataServicesContainer = driver.getByTestId(
		BigDataAndAnalytics.WhyChooseTechstackBigDataServices
	);
	const clutchButton = whyChooseTechstackBigDataServicesContainer.getByTestId(Buttons.Clutch);

	await clutchButton.click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.MarkBeare);
	await newPage.close();
});

test("Check member names and roles in 'Our Experts' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
	const allMemberRoles = ourExpertsContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'R&D Engineer, Software Engineering Lead,Yevhenii will advise the best custom solution',
		'Data Scientist,Analyzes data for actionable insights',
		'VP of Engineering,\nLeads the Tech Experts program and team',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = ourExpertsContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.OleksiiSvystun,
		ExpertNames.YevheniiKarachevtsev,
		ExpertNames.OleksandrBezrukov,
		ExpertNames.IvanYeremenko,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

// Unskip after Blog will be stable
test.skip("Check redirects by buttons in 'Our Experts' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
	const buttonUrlMap = new Map([
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.OleksandrBezrukov],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.IvanYeremenko],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.YevheniiKarachevtsev,
		],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksandrBezrukov,
		],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects by arrows in 'Related Services' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const relatedServicesContainer = driver.getByTestId(BigDataAndAnalytics.RelatedServices);

	const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Custom software\ndevelopment',
		'UX/UI Design',
		'AI & ML',
		'Development\nconsulting',
		'QA as a Service',
		'Cloud & DevOps',
		'Internet of Things',
	];

	await expect(allSectionTitles).toHaveText(testData);

	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
	}
});

test("Check section titles in 'FAQ' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const faqContainer = driver.getByTestId(BigDataAndAnalytics.Faq);

	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'What is the typical team composition of a Big Data-focused product?',
		'How long does it take to build a software product with Techstack?',
		'How long does it take to hire a product starter engineer?',
		'What is the difference between descriptive, predictive, and prescriptive analytics?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section collapsing in 'FAQ' container from the 'Big Data & Analytics' block @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const faqContainer = driver.getByTestId(BigDataAndAnalytics.Faq);
	const epectedNumberOfSections = 4;
	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, epectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
