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
import ExternalSourceLinks from '../../../../../preconditionsData/Links/ExternalSourceLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiMl));
});

test("Check redirect by links in 'AI’s Beneficial Impact on Industries' container from the 'AI&ML Service' block @Regression @AiMlService @TSWEB-694", async () => {
	const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(AiMlService.AiBeneficialImpactOnIndustries);
	// Replace with checks for redirect to pages and check url after investigate the "chrome-error://chromewebdata/" error
	const buttonLinkMap = new Map([
		[MainSiteButtons.Forbes, ExternalSourceLinks.ForbesAiStartups],
		[MainSiteButtons.Salesforce, ExternalSourceLinks.SalesforceCustomerEngagement],
		[MainSiteButtons.Deloitte, ExternalSourceLinks.DeloitteAiManufacturing],
		[MainSiteButtons.McKinsey, ExternalSourceLinks.McKinseyImpactOfAi],
	]);

	for (const entries of buttonLinkMap.entries()) {
		const actualLink = await aiBeneficialImpactOnIndustriesContainer.getByTestId(entries[0]).getAttribute('href');
		expect(actualLink).toEqual(entries[1]);
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

test('Check sections expanding and collapsing in "FAQ" container from the "AI&ML Service" page @Regression @AiMlService @TSWEB-694', async () => {
	const faqContainer = driver.getByTestId(AiMlService.Faq);
	const expectedNumberOfSections = 3;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA button from the "AI&ML Service" page @Regression @AiMlService @TSWEB-694', async () => {
	const ctaButton = driver.getByTestId(AiMlService.Info).getByTestId(MainSiteButtons.RequestAQuote);

	await baseDriverSteps.checkScrollToContainerByCtaButtonClick(ctaButton, AiMlService.GetInTouch);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
