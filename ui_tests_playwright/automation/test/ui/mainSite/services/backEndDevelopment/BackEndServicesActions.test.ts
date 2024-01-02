import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';
import Container from '../../../../../identifiers/Container';
import BackEndServices from '../../../../../identifiers/mainSite/pages/services/BackEndServices';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BackEndDevelopment));
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const ctaButtons = [
		driver.getByTestId(BackEndServices.Info).getByTestId(MainSiteButtons.GetAQuote),
		driver
			.getByTestId(BackEndServices.BackendForAnySoftwareProduct)
			.getByTestId(MainSiteButtons.ScheduleAFreeBackendConsultation),
		driver.getByTestId(BackEndServices.OurExperts).getByTestId(MainSiteButtons.BookYourExpertConsultation),

		driver.getByTestId(BackEndServices.PeekIntoBackend).getByTestId(MainSiteButtons.BoostYourBackend),
		driver
			.getByTestId(BackEndServices.HowWeCanWorkTogether)
			.getByTestId(MainSiteButtons.LetsDiscussOurPartnership),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, BackEndServices.GetInTouch);
	}
});

test('Check redirect by CTA button in "Our Featured Back-End Case Study" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const caseStudyContainer = driver.getByTestId(BackEndServices.CaseStudy);
	await caseStudyContainer.getByTestId(MainSiteButtons.MoreDetails).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.AnalyticsSubsystemForASalesEngagementPlatform}`,
			Environment.Production
		)
	);
});

test('Check redirect by "Clutch Review" button in "Our Featured Back-End Case Study" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const caseStudyContainer = driver.getByTestId(BackEndServices.CaseStudy);

	await baseDriverSteps.checkRedirectToPage(
		caseStudyContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.MarkBeare
	);
});

test('Check redirects by LinkedIn buttons in "Our Leading Back-End Engineers" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
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
});

test('Check redirects by Blog buttons in "Our Leading Back-End Engineers" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
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
});

test('Check redirect by "Clutch Review" button in "Why Techstack Stands Out" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const whyTechstackContainer = driver.getByTestId(BackEndServices.WhyTechstack);

	await baseDriverSteps.checkRedirectToPage(
		whyTechstackContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.MarkBeare
	);
});

test('Check carousel arrows clicks in "A Peek Into Our Back-End Development Process" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const peekIntoBackendContainer = driver.getByTestId(BackEndServices.PeekIntoBackend);

	await baseDriverSteps.checkCarouselArrowsClick(peekIntoBackendContainer);
});

test('Check redirect by links in "Back-End Development Services for Any Industry" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
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
});

test('Check redirect by arrows in "Related Services" container from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
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
});

test('Check sections expanding and collapsing in "FAQ" from the "Back-End Development" page @Regression @BackEndDevelopment @TSWEB-1208', async () => {
	const faqContainer = driver.getByTestId(BackEndServices.Faq);

	const expectedNumberOfSections = 5;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
