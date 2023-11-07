import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import DigitalTransformation from '../../../../../identifiers/mainSite/pages/services/DigitalTransformation';
import Container from '../../../../../identifiers/Container';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import Buttons from '../../../../../identifiers/Buttons';
import { ClutchReviewLinks } from '../../../../../preconditionsData/links/ClutchReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DigitalTransform));
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const ctaButtons = [
		driver.getByTestId(DigitalTransformation.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(DigitalTransformation.DigitalBusinessTransformation).getByTestId(MainSiteButtons.GetAConsultation),
		driver.getByTestId(DigitalTransformation.HowTechstackInfluence).getByTestId(MainSiteButtons.ScheduleAConsultation),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, DigitalTransformation.GetInTouch);
	}
});

test('Check redirects by links in "Industries We Serve" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const industriesContainer = driver.getByTestId(DigitalTransformation.IndustriesWeServe);
	const sections = industriesContainer.getByTestId(Container.ContainerSection);

	const linksUrlMap = new Map([
		[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[sections.getByTestId(MainSiteLinks.TransportAndLogistics), UrlProvider.urlBuilder(UrlPath.TransportAndLogist)],
		[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
	]);

	for (const [link, url] of linksUrlMap) {
		await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.CustomDev));
	}
});

test('Check redirect by CTA button in "Success Stories" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const successStoriesContainer = driver.getByTestId(DigitalTransformation.SuccessStories);

	await successStoriesContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.TrackingAndAggregation}`,
			Environment.Production
		)
	);
});

test('Check redirects by arrows in "Technologies We Use for Digital Transformation" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const technologiesContainer = driver.getByTestId(DigitalTransformation.TechnologiesWeUse);
	const containerSection = technologiesContainer.getByTestId(Container.ContainerSection);
	const arrows = containerSection.getByTestId(Container.Arrow);

	const arrowUrlMap = new Map([
		[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.DevOpsServ)],
		[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.BigData)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.DigitalTransform));
	}
});

test('Check redirects by "Clutch Review" button in "Digital Transformation Strategy" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const digitalStrategyContainer = driver.getByTestId(DigitalTransformation.DigitalTransformationStrategy);
	const clutchReviewButtons = digitalStrategyContainer.getByTestId(Buttons.Clutch);

	await baseDriverSteps.checkRedirectToPage(clutchReviewButtons, ClutchReviewLinks.MarkBeare);
});

test('Check carousel arrows clicks in "Technology Transformation Workflow" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const technologyWorkflowContainer = driver.getByTestId(DigitalTransformation.TechnologyTransformationWorkflow);

	await baseDriverSteps.checkCarouselArrowsClick(technologyWorkflowContainer);
});

test('Check sections expanding and collapsing in "FAQ" container from the "Digital Transformation" page @Regression @DigitalTransformation @TSWEB-1135', async () => {
	const faqContainer = driver.getByTestId(DigitalTransformation.Faq);
	const expectedNumberOfSections = 4;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
