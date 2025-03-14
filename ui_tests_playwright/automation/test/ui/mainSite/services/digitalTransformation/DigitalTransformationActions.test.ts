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
import {ClutchReviewIds} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.DigitalTransform));
});

test(
	qase(
		5370,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(DigitalTransformation.Info).getByTestId(MainSiteButtons.GetYourPersonalizedDxQuote),
			driver
				.getByTestId(DigitalTransformation.DigitalBusinessTransformation)
				.getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver
				.getByTestId(DigitalTransformation.DigitalTransformationStrategy)
				.getByTestId(MainSiteButtons.RequestAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, DigitalTransformation.GetInTouch);
		}
	}
);

test(
	qase(
		5372,
		'Check redirects by links in "Industries We Serve" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const industriesContainer = driver.getByTestId(DigitalTransformation.IndustriesWeServe);
		const sections = industriesContainer.getByTestId(Container.ContainerSection);

		const linksUrlMap = new Map([
			[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
			[
				sections.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.DigitalTransform));
		}
	}
);

test(
	qase(
		5368,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(DigitalTransformation.CaseStudy);

		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.TrackingAndAggregation}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5374,
		'Check redirects by arrows in "Technologies We Use for Digital Transformation" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const technologiesContainer = driver.getByTestId(DigitalTransformation.TechnologiesWeUse);
		const containerSection = technologiesContainer.getByTestId(Container.ContainerSection);
		const arrows = containerSection.getByTestId(Container.Arrow);

		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(7), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.DigitalTransform));
		}
	}
);

test(
	qase(
		5369,
		'Check redirect by "Clutch Review" button in "Digital Transformation Strategy" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const digitalStrategyContainer = driver.getByTestId(DigitalTransformation.DigitalTransformationStrategy);
		const clutchReviewButton = digitalStrategyContainer.getByTestId(Buttons.Clutch);

		await baseDriverSteps.checkRedirectToClutch(clutchReviewButton, ClutchReviewIds.MarkBeare);
	}
);

test(
	qase(
		5373,
		'Check carousel arrows clicks in "Technology Transformation Workflow" container from the "Digital Transformation" page @desktop @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const technologyWorkflowContainer = driver.getByTestId(DigitalTransformation.TechnologyTransformationWorkflow);

		await baseDriverSteps.checkCarouselArrowsClick(technologyWorkflowContainer);
	}
);

test(
	qase(
		5371,
		'Check sections expanding and collapsing in "FAQ" container from the "Digital Transformation" page @desktop @mobile @Regression @DigitalTransformation @TSWEB-1135'
	),
	async () => {
		const faqContainer = driver.getByTestId(DigitalTransformation.Faq);
		const expectedNumberOfSections = 4;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
