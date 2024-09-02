import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../../identifiers/Buttons';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import Healthcare from '../../../../../identifiers/mainSite/pages/industries/Healthcare';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import Container from '../../../../../identifiers/Container';
import ExternalSourceLinks from '../../../../../preconditionsData/links/ExternalSourceLinks';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Healthcare));
});

test(
	qase(
		5115,
		'Check redirect by "Clutch Review" button in "Case Study by Techstack" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(Healthcare.CaseStudy);

		const clutchReviewButton = caseStudyContainer.getByTestId(Buttons.Clutch);

		await baseDriverSteps.checkRedirectToClutch(clutchReviewButton, ClutchReviewLinks.AnonymousMedicalDevice);
	}
);

test(
	qase(
		5110,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(Healthcare.CaseStudy);

		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.BeatsScreeningModule}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5104,
		'Check redirect by links in "Most Recent Industry Facts" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const mostRecentIndustryFactsContainer = driver.getByTestId(Healthcare.MostRecentIndustryFacts);
		// Replace with checks for redirect to pages and check url after investigate the "chrome-error://chromewebdata/" error
		const buttonLinkMap = new Map([
			[MainSiteButtons.Pwc, ExternalSourceLinks.PwcHealthcareTrends],
			[MainSiteButtons.McKinsey, ExternalSourceLinks.McKinseyExpectInHealthcare],
		]);

		for (const entries of buttonLinkMap.entries()) {
			const actualLink = await mostRecentIndustryFactsContainer.getByTestId(entries[0]).getAttribute('href');
			expect(actualLink).toEqual(entries[1]);
		}
	}
);

test(
	qase(
		5142,
		'Check carousel arrows click in "How We Operate" container from the "Healthcare" page @desktop @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);

		await baseDriverSteps.checkCarouselArrowsClick(howWeOperateContainer);
	}
);

test(
	qase(
		5208,
		'Check redirects by arrows in "Core Practices" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);
		const arrows = corePracticesContainer.getByTestId(Container.ContainerSection).getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.Healthcare));
		}
	}
);

test(
	qase(
		5122,
		'Check sections expanding and collapsing in "FAQ" container from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const faqContainer = driver.getByTestId(Healthcare.Faq);
		const expectedNumberOfSections = 3;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test(
	qase(
		5136,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Healthcare" page @desktop @mobile @Regression @Healthcare @TSWEB-955'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(Healthcare.Info).getByTestId(MainSiteButtons.GetYourCustomProjectQuote),
			driver.getByTestId(Healthcare.OurExpertise).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver.getByTestId(Healthcare.HowWeOperate).getByTestId(MainSiteButtons.RequestAQuote),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, Healthcare.GetInTouch);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
