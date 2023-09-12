import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiMlService from '../../../../../identifiers/MainSite/pages/services/AiMlService';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import Buttons from '../../../../../identifiers/Buttons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
});

test("Check redirect by links in 'AI’s Beneficial Impact on Industries' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(AiMlService.AiBeneficialImpactOnIndustries);
	// Unskip after investigate
	const linkMap = new Map([
		[
			MainSiteButtons.Forbes,
			'https://www.forbes.com/sites/robtoews/2022/03/27/a-wave-of-billion-dollar-language-ai-startups-is-coming/?sh=422fd0152b14',
		],
		[MainSiteButtons.Salesforce, 'https://www.salesforce.com/news/stories/customer-engagement-research/'],
		[
			MainSiteButtons.Deloitte,
			'https://www2.deloitte.com/cn/en/pages/consumer-industrial-products/articles/ai-manufacturing-application-survey.html',
		],
		// [
		// 	MainSiteButtons.McKinsey,
		// 	'https://www.mckinsey.com/featured-insights/artificial-intelligence/notes-from-the-ai-frontier-modeling-the-impact-of-ai-on-the-world-economy',
		// ],
	]);

	for (const entries of linkMap.entries()) {
		await aiBeneficialImpactOnIndustriesContainer.getByTestId(entries[0]).first().click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(entries[1]);
		await newPage.close();

		// Remove after investigate
		const actualLink = await aiBeneficialImpactOnIndustriesContainer
			.getByTestId(MainSiteButtons.McKinsey)
			.getAttribute('href');

		expect(actualLink).toEqual(
			'https://www.mckinsey.com/featured-insights/artificial-intelligence/notes-from-the-ai-frontier-modeling-the-impact-of-ai-on-the-world-economy'
		);
	}
});

test("Check carousel sections and arrows in 'The Way We work' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const theWayWeWorkContainer = driver.getByTestId(AiMlService.TheWayWeWork);
	const carousel = theWayWeWorkContainer.getByTestId(Container.ContainerCarousel);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Discovery\nand Research',
		'Build\nPOC',
		'Tuning and\nadjustments',
		'Build\nProduct',
		'Release\nand Support',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual(['01', '02', '03', '04', '05']);

	await baseDriverSteps.checkCarouselArrowsClick(theWayWeWorkContainer);
});

test("Check redirect by Clutch button in 'Our approach' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourApproachContainer = driver.getByTestId(AiMlService.OurApproach);

	await ourApproachContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.DarrenCody);
});

// Unskip after Blog will be stable
test.skip("Check buttons in 'Our Experts' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const ourExpertsContainer = driver.getByTestId(AiMlService.OurExperts);
	const buttonUrlMap = new Map([
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.YevheniiKarachevtsev,
		],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.OleksandrBezrukov],
		[
			ourExpertsContainer.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksandrBezrukov,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check redirects by arrows in 'Related services' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const relatedServicesContainer = driver.getByTestId(AiMlService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
	}
});

test("Check sections expanding and collapsing in FAQ' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const faqContainer = driver.getByTestId(AiMlService.Faq);
	const epectedNumberOfSections = 3;
	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, epectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
