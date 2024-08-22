import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Container from '../../../../identifiers/Container';
import HomePage from '../../../../identifiers/mainSite/pages/HomePage';
import {ClutchReviewLinks} from '../../../../preconditionsData/links/ClutchReviewLinks';
import UrlProvider from '../../../../providers/UrlProvider';
import {driver} from '../../../../base/driver/Driver';
import UrlPath from '../../../../providers/UrlPath';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteLinks from '../../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../../preconditionsData/links/Links';
import BlogTagPath from '../../../../providers/BlogTagPath';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {test, expect} from '../../../../fixtures/DesktopMobileSetup';
import ExternalSourceLinks from '../../../../preconditionsData/links/ExternalSourceLinks';
import CaseStudies from '../../../../identifiers/mainSite/CaseStudies';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test(
	qase(
		5620,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(HomePage.WhatWeDo).getByTestId(MainSiteButtons.RequestAQuote),
			driver.getByTestId(HomePage.HowWeBuildCommunicationProcesses).getByTestId(MainSiteButtons.GetAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, HomePage.GetInTouch);
		}
	}
);

test.skip(
	qase(
		5076,
		'Check redirect by "Clutch Review" buttons in "Partner Testimonials" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

		const clutchReviewButton = partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviews);
		await clutchReviewButton.click();
		expect(await clutchReviewButton.getAttribute('class')).toContain('active');

		const clutchButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

		const buttonMap = new Map([
			[clutchButtons[0], ClutchReviewLinks.DerickDaily],
			[clutchButtons[1], ClutchReviewLinks.SherzodGafar],
			[clutchButtons[2], ClutchReviewLinks.MarkBeare],
			[clutchButtons[3], ClutchReviewLinks.NDA],
		]);

		for (const [button, url] of buttonMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5062,
		'Check redirects by blocks in "Industries We Serve" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const industriesServicesContainer = driver.getByTestId(HomePage.IndustriesWeServe);
		const containerSection = industriesServicesContainer.getByTestId(Container.ContainerBlock);
		const blockUrlMap = new Map([
			[
				containerSection.nth(0).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
			[
				containerSection.nth(1).getByTestId(Container.BlockTitle),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[containerSection.nth(2).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		]);

		for (const [block, url] of blockUrlMap) {
			await baseDriverSteps.checkRedirectToPage(block, url, UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5130,
		'Check redirects by arrows in "Software Development Services" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const softwareDevelopmentServicesContainer = driver.getByTestId(HomePage.SoftwareDevelopmentServices);
		const arrows = softwareDevelopmentServicesContainer
			.getByTestId(Container.ContainerBlock)
			.getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.DigitalTransform)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.DevOpsServ)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(7), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(8), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[arrows.nth(9), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(10), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5624,
		'Check redirect by CTA button in "Case Studies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const caseStudiesContainer = driver.getByTestId(HomePage.CaseStudies);
		const ctaButton = caseStudiesContainer.getByTestId(MainSiteButtons.ReadAllCases);
		await baseDriverSteps.checkRedirectToPage(
			ctaButton,
			UrlProvider.urlBuilder(UrlPath.CaseStudies),
			UrlProvider.webSiteUrl()
		);
	}
);

test(
	qase(
		5616,
		'Check redirect by CTA button in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver
			.getByTestId(HomePage.BriefOverviewOfTechnologies)
			.getByTestId(MainSiteButtons.ViewFullTechnologyStack);
		await baseDriverSteps.checkRedirectToPage(
			briefOverviewOfTechnologiesContainer,
			UrlProvider.urlBuilder(UrlPath.OurServicesTechnologyStackBlock),
			UrlProvider.webSiteUrl()
		);
	}
);

test(
	qase(
		5090,
		'Check redirect by link in "Working with Businesses Worldwide" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const workingWithBusinessesContainer = driver.getByTestId(HomePage.WorkingWithBusinessesWorldwide);
		const clutchLink = workingWithBusinessesContainer.getByTestId(MainSiteLinks.Clutch).locator('visible=true');

		await baseDriverSteps.checkRedirectToClutch(clutchLink, Links.ClutchHighlights);
	}
);

test(
	qase(
		5625,
		'Check redirect by card in "Recognition and Media Presence" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const recognitionAndMediaPresenceContainer = driver.getByTestId(HomePage.RecognitionAndMediaPresence);
		const caseCards = recognitionAndMediaPresenceContainer
			.getByTestId(CaseStudies.CaseList)
			.getByTestId(CaseStudies.CaseCard);

		const urlCardMap = new Map([
			[caseCards.nth(0).getByTestId(CaseStudies.CaseName), ExternalSourceLinks.GeekwireMajorDataBreaches],
			[
				caseCards.nth(1).getByTestId(CaseStudies.CaseName),
				ExternalSourceLinks.HackernoonDetailedPMOTimeManagementGuide,
			],
			[caseCards.nth(2).getByTestId(CaseStudies.CaseName), ExternalSourceLinks.HackernoonTheWorkYouDefer],
		]);

		for (const [card, url] of urlCardMap) {
			await baseDriverSteps.checkRedirectToPage(card, url);
		}
	}
);

test(
	qase(
		5095,
		'Check url CTA button from the "Company insights" container on the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const companyInsightsContainer = driver.getByTestId(HomePage.CompanyInsights);
		await companyInsightsContainer.getByTestId(MainSiteButtons.SeeAllNews).click();

		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(BlogTagPath.TechstackNews));
	}
);

test(
	qase(
		5626,
		'Check sections expanding and collapsing in "FAQ" container on the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const faqContainer = driver.getByTestId(HomePage.Faq);
		const expectedNumberOfSections = 3;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
