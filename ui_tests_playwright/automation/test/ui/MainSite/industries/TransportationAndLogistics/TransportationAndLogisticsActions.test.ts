import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import TransportationAndLogistics from '../../../../../identifiers/MainSite/pages/industries/TransportationAndLogistics';
import Container from '../../../../../identifiers/Container';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
});

test("Check redirect by 'Clutch Review' button in 'Case Study by Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack);

	await caseStudyByTechstackContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.AnonymousVehicle);
});

test("Check redirect by 'Read Full Case Study' button in 'Case Study by Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const caseStudyByTechstackContainer = driver.getByTestId(TransportationAndLogistics.CaseStudyByTechstack);

	await caseStudyByTechstackContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(`${UrlPath.CaseStudies}${CaseStudyPath.CargoAuctionSolution}`, Environment.Production)
	);
});

test("Check redirects by arrows in 'Our Expertise in Logistics Software Development Solutions' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const ourExpertiseInLogisticsSoftDevSolutionsContainer = driver.getByTestId(
		TransportationAndLogistics.OurExpertiseInLogisticsSoftDevSolutions
	);
	const arrows = ourExpertiseInLogisticsSoftDevSolutionsContainer
		.getByTestId(Container.ContainerSection)
		.getByTestId(Container.Arrow);

	const arrowUrlMap = new Map([
		[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.BigData)],
		[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.CustomDev)],
	]);

	await baseDriverSteps.checkRedirectToPages(arrowUrlMap, UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
});

test("Check carousel arrows click in 'Transportation and Logistics Software Development at Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const transportationAndLogisticsContainer = driver.getByTestId(
		TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack
	);

	await baseDriverSteps.checkCarouselArrowsClick(transportationAndLogisticsContainer);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
