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

test("Check redirect by 'Home' breadcrumbs button in header from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const info = driver.getByTestId(TransportationAndLogistics.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
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
	const containerSection = ourExpertiseInLogisticsSoftDevSolutionsContainer.getByTestId(Container.ContainerSection);

	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.TransportAndLogist));
	}
});

test("Check carousel sections, arrows and 'Contact Us' button in 'Transportation and Logistics Software Development at Techstack' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const transportationAndLogisticsSoftwareDevAtTechstackContainer = driver.getByTestId(
		TransportationAndLogistics.TransportationAndLogisticsSoftwareDevAtTechstack
	);
	const carousel = transportationAndLogisticsSoftwareDevAtTechstackContainer.getByTestId(Container.ContainerCarousel);

	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Make\ncontact', 'Meet a tech specialist', 'Discuss\nthe terms', 'Sign the\ncontract'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'Step 1',
		'Step 2',
		'Step 3',
		'Step 4',
	]);

	await baseDriverSteps.checkCarouselArrowsClick(transportationAndLogisticsSoftwareDevAtTechstackContainer);

	await expect(
		transportationAndLogisticsSoftwareDevAtTechstackContainer.getByTestId(Buttons.ContactUs)
	).toBeVisible();
});

test("Check sections expanding and collapsing in 'FAQ' container from the 'Transportation and Logistics' block @Regression @TransportationAndLogistics @TSWEB-956", async () => {
	const faqContainer = driver.getByTestId(TransportationAndLogistics.Faq);
	const epectedNumberOfSections = 4;
	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, epectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
