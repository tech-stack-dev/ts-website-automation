import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import BackEndServices from '../../../../../identifiers/mainSite/pages/services/BackEndServices';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
});

test(
	qase(
		5516,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const ctaButtons = [
			driver.getByTestId(BackEndServices.Info).getByTestId(MainSiteButtons.GetYourCustomBeDevelopmentQuote),
			driver.getByTestId(BackEndServices.ExpertServices).getByTestId(MainSiteButtons.GetYourQuoteNow),
			driver.getByTestId(BackEndServices.OurExperts).getByTestId(MainSiteButtons.GetYourCustomQuote),
			driver.getByTestId(BackEndServices.PeekIntoBackend).getByTestId(MainSiteButtons.RequestAQuote),
			driver.getByTestId(BackEndServices.HowWeCanWorkTogether).getByTestId(MainSiteButtons.GetYourQuoteNow),
		];

		for (const button of ctaButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, BackEndServices.GetInTouch);
		}
	}
);

test(
	qase(
		5520,
		'Check redirect by CTA button in "Our Featured Back-End Case Study" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(BackEndServices.CaseStudy);

		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.AnalyticsSubsystemEngagementPlatform}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5523,
		'Check redirect by "Clutch Review" button in "Our Featured Back-End Case Study" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(BackEndServices.CaseStudy);

		await baseDriverSteps.checkRedirectToClutch(
			caseStudyContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.MarkBeare
		);
	}
);

test(
	qase(
		5519,
		'Check redirects by LinkedIn buttons in "Our Leading Back-End Engineers" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BackEndServices.OurExperts);
		const linkedInButtons = ourExpertsContainer.getByTestId(Buttons.LinkedIn);
		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.IvanYeremenko],
			[linkedInButtons.nth(2), ExpertsLinkedInLinks.SerhiiLedniov],
			[linkedInButtons.nth(3), ExpertsLinkedInLinks.VladyslavUshakov],
			[linkedInButtons.nth(4), ExpertsLinkedInLinks.OleksandrMakarov],
			[linkedInButtons.nth(5), ExpertsLinkedInLinks.DmitryValko],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5522,
		'Check redirects by Blog buttons in "Our Leading Back-End Engineers" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208 @TSWEB-1061'
	),
	async () => {
		const ourExpertsContainer = driver.getByTestId(BackEndServices.OurExperts);
		const blogButtons = ourExpertsContainer.getByTestId(Buttons.Blog);
		const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);
		const buttonUrlMap = new Map([
			[blogButtons.nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
			[blogButtons.nth(1), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
			[blogButtons.nth(2), `${blogUri}${AuthorsEnum.VladyslavUshakov}`],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
		}
	}
);

test(
	qase(
		5518,
		'Check redirect by "Clutch Review" button in "Why Techstack Stands Out" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const whyTechstackContainer = driver.getByTestId(BackEndServices.WhyTechstack);

		await baseDriverSteps.checkRedirectToClutch(
			whyTechstackContainer.getByTestId(Buttons.Clutch),
			ClutchReviewLinks.MarkBeare
		);
	}
);

test(
	qase(
		5524,
		'Check carousel arrows clicks in "A Peek Into Our Back-End Development Process" container from the "Back-End Development" page @desktop @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const peekIntoBackendContainer = driver.getByTestId(BackEndServices.PeekIntoBackend);

		await baseDriverSteps.checkCarouselArrowsClick(peekIntoBackendContainer);
	}
);

test(
	qase(
		5521,
		'Check redirect by links in "Back-End Development Services for Any Industry" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const BackendDevelopmentServicesContainer = driver.getByTestId(BackEndServices.BackendDevelopmentServices);
		const linksUrlMap = new Map([
			[
				BackendDevelopmentServicesContainer.getByTestId(MainSiteLinks.Healthcare),
				UrlProvider.urlBuilder(UrlPath.Healthcare),
			],
			[
				BackendDevelopmentServicesContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[
				BackendDevelopmentServicesContainer.getByTestId(MainSiteLinks.RenewableEnergy),
				UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			],
			[
				BackendDevelopmentServicesContainer.getByTestId(MainSiteLinks.DigitalTransformation),
				UrlProvider.urlBuilder(UrlPath.DigitalTransform),
			],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
		}
	}
);

test(
	qase(
		5525,
		'Check redirect by arrows in "Related Services" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(BackEndServices.RelatedServices);
		const arrows = relatedServicesContainer.getByTestId(Container.BlockSection).getByTestId(Container.Arrow);
		const arrowUrlMap = new Map([
			[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
			[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
			[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
			[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
			[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[arrows.nth(7), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[arrows.nth(8), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
		}
	}
);

test(
	qase(
		5517,
		'Check sections expanding and collapsing in "FAQ" container from the "Back-End Development" page @desktop @mobile @Regression @BackEndDevelopment @TSWEB-1208'
	),
	async () => {
		const faqContainer = driver.getByTestId(BackEndServices.Faq);
		const expectedNumberOfSections = 5;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
