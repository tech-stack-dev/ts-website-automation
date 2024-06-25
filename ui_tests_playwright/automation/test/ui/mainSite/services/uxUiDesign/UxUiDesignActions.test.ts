import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import UxUiDesign from '../../../../../identifiers/mainSite/pages/services/UxUiDesign';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import Links from '../../../../../preconditionsData/links/Links';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import ExpertsBehanceLinks from '../../../../../preconditionsData/links/ExpertsBehanceLinks';
import Container from '../../../../../identifiers/Container';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
});

test(
	qase(
		5358,
		'Check redirect by "Clutch Review" button in "Success Stories" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const successStoriesContainer = driver.getByTestId(UxUiDesign.SuccessStories);

		await baseDriverSteps.checkRedirectToClutch(
			successStoriesContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.AnonymousMedicalDevice
		);
	}
);

test(
	qase(
		4794,
		'Check redirect by CTA button in "Success Stories" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const successStoriesContainer = driver.getByTestId(UxUiDesign.SuccessStories);

		await successStoriesContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.RedesignPatientDataSystem}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4890,
		'Check carousel arrows clicks in "Typical UX/UI Design Workflow" container from the "UX/UI Design" page @desktop @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const typicalUxUiDesignWorkflowContainer = driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow);

		await baseDriverSteps.checkCarouselArrowsClick(typicalUxUiDesignWorkflowContainer);
	}
);

test(
	qase(
		4816,
		'Check redirects by links in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
		const linkUrlMap = new Map([
			[weNeverStopImprovingContainer.getByTestId(MainSiteLinks.Instagram), Links.InstagramDesign],
			[weNeverStopImprovingContainer.getByTestId(MainSiteLinks.Tiktok), Links.TikTokDesign],
		]);

		for (const [link, url] of linkUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url);
		}
	}
);

test(
	qase(
		4800,
		'Check redirects by LinkedIn buttons in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
		const linkedInButtons = weNeverStopImprovingContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.DmytroDytiuk],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.HannaZhyhan],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.YelyzavetaLvova],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.MariiaPetrovych],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		4808,
		'Check redirect by Blog button in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670 @TSWEB-1061'
	),
	async () => {
		const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
		const blogButton = weNeverStopImprovingContainer.getByTestId(Buttons.Blog);
		const url = UrlProvider.urlBuilder(`${UrlPath.AuthorPage}${AuthorsEnum.DmytroDytiuk}`);

		await baseDriverSteps.checkRedirectToPage(blogButton, url, UrlProvider.urlBuilder(UrlPath.UiUxDesign));
	}
);

test(
	qase(
		4838,
		'Check redirect by Behance button in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);

		await baseDriverSteps.checkRedirectToPage(
			weNeverStopImprovingContainer.getByTestId(Buttons.Behance),
			ExpertsBehanceLinks.DmytroDytuk
		);
	}
);

test(
	qase(
		4822,
		'Check redirect by link in "Related Services" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
		await relatedServicesContainer.getByTestId(MainSiteLinks.CaseStudy).click();

		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.OneStopPlatformDesignHospitality}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		4917,
		'Check redirects by arrows in "Related Services" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
		const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
		const arrows = containerSection.getByTestId(Container.Arrow);

		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.UiUxDesign));
		}
	}
);

test(
	qase(
		4862,
		'Check sections expanding and collapsing in "FAQ" container from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const faqContainer = driver.getByTestId(UxUiDesign.Faq);
		const expectedNumberOfSections = 8;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		4847,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "UX/UI Design" page @desktop @mobile @Regression @UxUiDesign @TSWEB-670'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(UxUiDesign.Info).getByTestId(MainSiteButtons.GetYourCustomDesignQuote),
			driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct).getByTestId(MainSiteButtons.GetYourQuoteNow),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, UxUiDesign.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
