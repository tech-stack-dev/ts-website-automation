import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiDevelopment from '../../../../../identifiers/MainSite/pages/services/AiDevelopment';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import Buttons from '../../../../../identifiers/Buttons';
import ExternalSourceLinks from '../../../../../preconditionsData/Links/ExternalSourceLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiDevelopment));
	await driver.getByTestId(Buttons.AcceptCookies).click();
});

test('Check redirect by links in "AI’s Beneficial Impact on Industries" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(AiDevelopment.AiBeneficialImpactOnIndustries);
	// Replace with checks for redirect to pages and check url after investigate the 'chrome-error://chromewebdata/' error
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

test('Check redirect by "Clutch Review" button in "Incorporating AI/ML into Existing Healthcare Flow" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const incorporatingAIContainer = driver.getByTestId(AiDevelopment.IncorporatingAI);

	await incorporatingAIContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.AnonymousMedicalDevice);
	await newPage.close();
});

test('Check redirect by CTA button in "Incorporating AI/ML into Existing Healthcare Flow" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694 @TSWEB-1148', async () => {
	const incorporatingAIContainer = driver.getByTestId(AiDevelopment.IncorporatingAI);

	await incorporatingAIContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click(); // Fix button data-id in scope of TSWEB-1148
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.IncorporatingAimlIntoFlow}`,
			Environment.Production
		)
	);
});

test('Check redirect by links in "Industries We Serve" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694 @TSWEB-1148', async () => {
	const industriesWeServeContainer = driver.getByTestId(AiDevelopment.IndustriesWeServe);

	const linksUrlMap = new Map([
		[industriesWeServeContainer.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[
			industriesWeServeContainer.getByTestId(MainSiteLinks.RenewableEnergy),
			UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
		],
		[
			industriesWeServeContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
			UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
		],
	]);

	await baseDriverSteps.checkRedirectToPages(linksUrlMap, UrlProvider.urlBuilder(UrlPath.AiDevelopment));
});

test('Check carousel arrows click in "The Way We work" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const theWayWeWorkContainer = driver.getByTestId(AiDevelopment.TheWayWeWork);

	await baseDriverSteps.checkCarouselArrowsClick(theWayWeWorkContainer);
});

test('Check redirect by "Clutch Review" button in "Our Approach" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const ourApproachContainer = driver.getByTestId(AiDevelopment.OurApproach);

	await ourApproachContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.DarrenCody);
});

test('Check redirect by arrows in "Related services" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const relatedServicesContainer = driver.getByTestId(AiDevelopment.RelatedServices);
	const arrows = relatedServicesContainer.getByTestId(Container.ContainerSection).getByTestId(Container.Arrow);
	const arrowUrlMap = new Map([
		[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.BigData)],
		[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.AiDevelopment));
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const faqContainer = driver.getByTestId(AiDevelopment.Faq);
	const expectedNumberOfSections = 4;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
