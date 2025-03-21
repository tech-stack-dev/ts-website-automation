import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import TransportationAndLogistics from '../../../../../identifiers/mainSite/pages/industries/TransportationAndLogistics';
import Container from '../../../../../identifiers/Container';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewIds} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
});

test(
	qase(
		5332,
		'Check redirect by "Clutch Review" button in "Case Study by Techstack" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudy);
		await baseDriverSteps.checkRedirectToClutch(
			caseStudyByTechstackContainer.getByTestId(Buttons.Clutch),
			ClutchReviewIds.AnonymousVehicle
		);
	}
);

test(
	qase(
		5328,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudy);

		await caseStudyByTechstackContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.CargoAuctionSolution}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4779,
		'Check redirects by arrows in "Our Expertise in Logistics Software Development Solutions" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const ourExpertiseInLogisticsSoftDevSolutionsContainer = driver.getByTestId(
			TransportationAndLogistics.OurExpertise
		);
		const arrows = ourExpertiseInLogisticsSoftDevSolutionsContainer
			.getByTestId(Container.ContainerSection)
			.getByTestId(Container.Arrow);

		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
		}
	}
);

test(
	qase(
		5348,
		'Check carousel arrows click in "Transportation and Logistics Software Development at Techstack" container from the "Transportation and Logistics" page @desktop @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const transportationAndLogisticsContainer = driver.getByTestId(
			TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack
		);

		await baseDriverSteps.checkCarouselArrowsClick(transportationAndLogisticsContainer);
	}
);

test(
	qase(
		5336,
		'Check sections expanding and collapsing in "FAQ" container from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const faqContainer = driver.getByTestId(TransportationAndLogistics.Faq);
		const expectedNumberOfSections = 4;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5338,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Transportation and Logistics" page @desktop @mobile @Regression @TransportationAndLogistics @TSWEB-956'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(TransportationAndLogistics.Info).getByTestId(MainSiteButtons.GetYourCustomProjectQuote),
			driver.getByTestId(TransportationAndLogistics.WhoWeServe).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver
				.getByTestId(TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack)
				.getByTestId(MainSiteButtons.RequestAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, TransportationAndLogistics.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
