import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiDevelopment from '../../../../../identifiers/MainSite/pages/services/AiDevelopment';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import Buttons from '../../../../../identifiers/Buttons';
import ExternalSourceLinks from '../../../../../preconditionsData/Links/ExternalSourceLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiDevelopment));
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

	await baseDriverSteps.checkRedirectToPage(
		incorporatingAIContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.AnonymousMedicalDevice
	);
});

test('Check redirect by CTA button in "Incorporating AI/ML into Existing Healthcare Flow" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const incorporatingAIContainer = driver.getByTestId(AiDevelopment.IncorporatingAI);

	await incorporatingAIContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.IncorporatingAimlIntoFlow}`,
			Environment.Production
		)
	);
});

test('Check redirect by links in "Industries We Serve" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
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
		[
			industriesWeServeContainer.getByTestId(MainSiteLinks.DigitalTransformation),
			UrlProvider.urlBuilder(UrlPath.DigitalTransform),
		],
	]);

	for (const [link, url] of linksUrlMap) {
		await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.AiDevelopment));
	}
});

test('Check carousel arrows click in "The Way We work" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const theWayWeWorkContainer = driver.getByTestId(AiDevelopment.TheWayWeWork);

	await baseDriverSteps.checkCarouselArrowsClick(theWayWeWorkContainer);
});

test('Check redirect by "Clutch Review" button in "Our Approach" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const ourApproachContainer = driver.getByTestId(AiDevelopment.OurApproach);

	await baseDriverSteps.checkRedirectToPage(
		ourApproachContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.DarrenCody
	);
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
		await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.AiDevelopment));
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const faqContainer = driver.getByTestId(AiDevelopment.Faq);
	const expectedNumberOfSections = 4;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "AI Development" page @Regression @AiDevelopment @TSWEB-694', async () => {
	const ctaButtons = [
		driver.getByTestId(AiDevelopment.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(AiDevelopment.IndustriesWeServe).getByTestId(MainSiteButtons.LetsDiscussYourTechNeeds),
		driver.getByTestId(AiDevelopment.OurApproach).getByTestId(MainSiteButtons.ScheduleAFreeConsultation),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, AiDevelopment.GetInTouch, 0.7);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
