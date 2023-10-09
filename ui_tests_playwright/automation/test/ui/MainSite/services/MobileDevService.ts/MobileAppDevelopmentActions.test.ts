import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import MobileDevService from '../../../../../identifiers/MainSite/pages/services/MobileDevService';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test('Check redirect by "More product details" button in "Industry-Specific Solution" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const industrySpecificSolutionContainer = driver.getByTestId(MobileDevService.IndustrySpecificSolution);

	await industrySpecificSolutionContainer.getByTestId(MainSiteButtons.MoreProductDetails).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.MobileSocialNetworkForSportsFans}`,
			Environment.Production
		)
	);
});

test('Check redirect by links in "What Industries We Serve" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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
});

test('Check redirects by Clutch buttons in "Our Approach to Mobile App Development Services" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproachToMobileAppDevServices);
	const clutchButtons = await ourApproachContainer.getByTestId(Buttons.Clutch).all();

	const buttonUrlMap = new Map([
		[clutchButtons[0], ClutchReviewLinks.AnonymousPeerToPeer],
		[clutchButtons[1], ClutchReviewLinks.AnonymousMedicalDevice],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test('Check carousel arrows in "Mobile App Development Process" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const mobileAppDevProcessContainer = driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(mobileAppDevProcessContainer, 3);
});

test('Check redirects by LinkedIn buttons in "We Never Stop Improving Your Product" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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
});

test('Check redirects by arrows in "Related Services" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
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
});

test('Check sections expanding and collapsing in "FAQ" container from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const faqContainer = driver.getByTestId(MobileDevService.Faq);
	const expectedNumberOfSections = 4;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Mobile App Development" page @Regression @MobileAppDev @TSWEB-696', async () => {
	const ctaButtons = [
		driver.getByTestId(MobileDevService.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(MobileDevService.MobileApplicationDevTechStack).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(MobileDevService.TheCostOfMobileAppDevelopment).getByTestId(MainSiteButtons.ScheduleACall),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, MobileDevService.GetInTouch);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
