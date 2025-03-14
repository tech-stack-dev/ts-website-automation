import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import AiDevelopment from '../../../../../identifiers/mainSite/pages/services/AiDevelopment';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {Environment} from '../../../../../providers/EnvProvider';
import {ClutchReviewIds} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import Buttons from '../../../../../identifiers/Buttons';
import ExternalSourceLinks from '../../../../../preconditionsData/links/ExternalSourceLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AiDevelopment));
});

test(
	qase(
		4795,
		'Check redirect by "Clutch Review" button in "Case Study by Techstack" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(AiDevelopment.CaseStudy);

		await baseDriverSteps.checkRedirectToClutch(
			caseStudyContainer.getByTestId(Buttons.Clutch),
			ClutchReviewIds.AnonymousMedicalDevice
		);
	}
);

test(
	qase(
		4785,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(AiDevelopment.CaseStudy);

		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.IncorporatingAimlIntoFlow}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4809,
		'Check redirect by links in "Industries We Deliver AI Development Services To" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const industriesWeServeContainer = driver.getByTestId(AiDevelopment.IndustriesWeServe);

		const linksUrlMap = new Map([
			[
				industriesWeServeContainer.getByTestId(MainSiteLinks.Healthcare),
				UrlProvider.urlBuilder(UrlPath.Healthcare),
			],
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
	}
);

test(
	qase(
		5361,
		'Check redirect by links in "AI’s Beneficial Impact on Industries" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const aiBeneficialImpactOnIndustriesContainer = driver.getByTestId(
			AiDevelopment.AiBeneficialImpactOnIndustries
		);
		// Replace with checks for redirect to pages and check url after investigate the 'chrome-error://chromewebdata/' error
		const buttonLinkMap = new Map([
			[MainSiteButtons.Forbes, ExternalSourceLinks.ForbesAiStartups],
			[MainSiteButtons.Salesforce, ExternalSourceLinks.SalesforceCustomerEngagement],
			[MainSiteButtons.Deloitte, ExternalSourceLinks.DeloitteAiManufacturing],
			[MainSiteButtons.McKinsey, ExternalSourceLinks.McKinseyImpactOfAi],
		]);

		for (const entries of buttonLinkMap.entries()) {
			const actualLink = await aiBeneficialImpactOnIndustriesContainer
				.getByTestId(entries[0])
				.getAttribute('href');
			expect(actualLink).toEqual(entries[1]);
		}
	}
);

test(
	qase(
		4820,
		'Check carousel arrows click in "The Way We Work" container from the "AI Development" page @desktop @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const theWayWeWorkContainer = driver.getByTestId(AiDevelopment.TheWayWeWork);

		await baseDriverSteps.checkCarouselArrowsClick(theWayWeWorkContainer);
	}
);

test(
	qase(
		4857,
		'Check redirect by "Clutch Review" button in "Our Approach" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(AiDevelopment.OurApproach);

		await baseDriverSteps.checkRedirectToClutch(
			ourApproachContainer.getByTestId(Buttons.Clutch),
			ClutchReviewIds.DarrenCody
		);
	}
);

test(
	qase(
		5608,
		'Check carousel arrows click in "Custom AI Solutions We Can Build" container from the "AI Development" page @desktop @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const customAiSolutionsContainer = driver.getByTestId(AiDevelopment.CustomAiSolutions);

		await baseDriverSteps.checkCarouselArrowsClick(customAiSolutionsContainer);
	}
);

test(
	qase(
		4839,
		'Check redirect by arrows in "Related Services" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
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
	}
);

test(
	qase(
		4803,
		'Check sections expanding and collapsing in "FAQ" container from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const faqContainer = driver.getByTestId(AiDevelopment.Faq);
		const expectedNumberOfSections = 4;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		4815,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "AI Development" page @desktop @mobile @Regression @AiDevelopment @TSWEB-694'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(AiDevelopment.Info).getByTestId(MainSiteButtons.GetYourCustomAiQuote),
			driver.getByTestId(AiDevelopment.OurAiDevelopmentServices).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver
				.getByTestId(AiDevelopment.IndustriesWeServe)
				.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote),
			driver.getByTestId(AiDevelopment.OurApproach).getByTestId(MainSiteButtons.GetAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, AiDevelopment.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
