import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Container from '../../../identifiers/Container';
import HomePage from '../../../identifiers/mainSite/pages/HomePage';
import {ClutchReviewLinks} from '../../../preconditionsData/links/ClutchReviewLinks';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import UrlPath from '../../../providers/UrlPath';
import MainSiteButtons from '../../../identifiers/mainSite/MainSiteButtons';
import MainSiteLinks from '../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../preconditionsData/links/Links';
import BlogTagPath from '../../../providers/BlogTagPath';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {test, expect} from '../../../fixtures/DesktopMobileSetup';
import TechnologyStackData from '../../../preconditionsData/technologyStack/TechnologyStackData';
import BaseDriver from '../../../base/driver/BaseDriver';

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

test(
	qase(
		5011,
		'Check the "Enhance Healthcare Strategy: Free Cloud Guide" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const enhanceHealthcareContainer = driver.getByTestId(HomePage.EnhanceHealthcareStrategy);
		enhanceHealthcareContainer.getByTestId(MainSiteButtons.FreeCloudGuide);
        await baseDriverSteps.checkRedirectToPage(
			enhanceHealthcareContainer,
			UrlProvider.urlBuilder(UrlPath.Whitepapers),
			UrlProvider.webSiteUrl()
        )
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
			[clutchButtons[2], ClutchReviewLinks.MarkBeare],
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
		5615,
		'Check navigation bar and award cards in "Brief Overview of Technologies" container from the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006'
	),
	async () => {
		const briefOverviewOfTechnologiesContainer = driver.getByTestId(HomePage.BriefOverviewOfTechnologies);
		const navigationTabs = await TechnologyStackData.getTechnologyStackTabsForHomePage(
			briefOverviewOfTechnologiesContainer
		);
		const awardCardCountList = [8, 5, 5, 4, 8, 5];

		for (let index = 0; index < navigationTabs.length; index++) {
			navigationTabs[index].click();
			const awardCards = briefOverviewOfTechnologiesContainer
				.getByTestId(Container.AwardCard)
				.locator('visible=true');

			await baseDriverSteps.checkImagesVisibility(awardCards, awardCardCountList[index]);
		}
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
		5095,
		'Check url CTA button from the "Company insights" container on the "Home" page @desktop @mobile @Regression @HomePage @TSWEB-1006 @TSWEB-1061'
	),
	async () => {
		const companyInsightsContainer = driver.getByTestId(HomePage.CompanyInsights);
		companyInsightsContainer.getByTestId(MainSiteButtons.SeeAllNews).click();

		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(BlogTagPath.TechstackNews));
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
