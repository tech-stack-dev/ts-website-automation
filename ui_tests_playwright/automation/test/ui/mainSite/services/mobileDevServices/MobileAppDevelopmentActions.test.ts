import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import {expertiseUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ExpertiseEnum} from '../../../../../enum/ExpertiseEnum';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {ClutchReviewIds} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import MobileDevService from '../../../../../identifiers/mainSite/pages/services/MobileDevService';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {LinkedInReviewLinks} from '../../../../../preconditionsData/links/LinkedInReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(expertiseUrl[ExpertiseEnum.MobileDev]);
});

test('Check redirect by "LinkedIn Review" button in "Case Study by Techstack" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696', async () => {
	const caseStudyContainer = driver.getByTestId(MobileDevService.CaseStudy);
	const linkedInReviewButton = caseStudyContainer.getByTestId(Buttons.LinkedIn);

	await baseDriverSteps.checkRedirectToPage(linkedInReviewButton, LinkedInReviewLinks.JohnBusch);
});

test(
	qase(
		5216,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(MobileDevService.CaseStudy);

		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.MobileSocialNetworkForSportsFans}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5241,
		'Check redirect by links in "What Industries We Serve" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const whatIndustriesWeServeContainer = driver.getByTestId(MobileDevService.WhatIndustriesWeServe);

		const linksUrlMap = new Map([
			[
				whatIndustriesWeServeContainer.getByTestId(MainSiteLinks.Healthcare),
				UrlProvider.urlBuilder(UrlPath.Healthcare),
			],
			[
				whatIndustriesWeServeContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				whatIndustriesWeServeContainer.getByTestId(MainSiteLinks.RenewableEnergy),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.MobileDev));
		}
	}
);

test(
	qase(
		5227,
		'Check redirects by "Clutch Review" buttons in "Our Approach to Mobile App Development Services" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproach);
		const clutchButtons = await ourApproachContainer.getByTestId(Buttons.Clutch).all();

		const buttonUrlMap = new Map([
			[clutchButtons[0], ClutchReviewIds.AnonymousPeerToPeer],
			[clutchButtons[1], ClutchReviewIds.AnonymousMedicalDevice],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToClutch(button, url);
		}
	}
);

test(
	qase(
		5251,
		'Check carousel arrows clicks in "Mobile App Development Process" container from the "Mobile App Development" page @desktop @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const mobileAppDevProcessContainer = driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess);

		await baseDriverSteps.checkCarouselArrowsClick(mobileAppDevProcessContainer, 3);
	}
);

test(
	qase(
		5233,
		'Check redirects by LinkedIn buttons in "We Never Stop Improving Your Product" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696 @TSWEB-945'
	),
	async () => {
		const weNeverStopImprovingContainer = driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct);
		const linkedInButtons = weNeverStopImprovingContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.YevheniiKarachevtsev],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.IvanYeremenko],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.MariaDarmanian],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.DmytroShtapauk],
			[linkedInButtons.nth(4), ExpertsLinkedInLinks.VitaliiDolotov],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5317,
		'Check redirects by arrows in "Related Services" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(MobileDevService.RelatedServices);
		const arrows = relatedServicesContainer.getByTestId(Container.Arrow);

		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.MobileDev));
		}
	}
);

test(
	qase(
		5246,
		'Check sections expanding and collapsing in "FAQ" container from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const faqContainer = driver.getByTestId(MobileDevService.Faq);
		const expectedNumberOfSections = 4;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5270,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Mobile App Development" page @desktop @mobile @Regression @MobileAppDev @TSWEB-696'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(MobileDevService.Info).getByTestId(MainSiteButtons.GetYourCustomMobileDevQuote),
			driver.getByTestId(MobileDevService.WhatWeDo).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver
				.getByTestId(MobileDevService.WhatIndustriesWeServe)
				.getByTestId(MainSiteButtons.GetYourIndustrySpecificQuote),
			driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess).getByTestId(MainSiteButtons.RequestAQuote),
			driver
				.getByTestId(MobileDevService.TheCostOfMobileAppDevelopment)
				.getByTestId(MainSiteButtons.GetAFreeQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, MobileDevService.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
