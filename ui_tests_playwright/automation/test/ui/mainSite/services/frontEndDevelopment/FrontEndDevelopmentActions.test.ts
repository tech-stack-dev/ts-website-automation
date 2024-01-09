import {test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import FrontEndDevelopment from '../../../../../identifiers/mainSite/pages/services/FrontEndDevelopment';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Container from '../../../../../identifiers/Container';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment));
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const ctaButtons = [
		driver.getByTestId(FrontEndDevelopment.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver
			.getByTestId(FrontEndDevelopment.FrontedWebDevelopment)
			.getByTestId(MainSiteButtons.SubmitYourServiceRequestNow),
		driver.getByTestId(FrontEndDevelopment.CooperationModels).getByTestId(MainSiteButtons.ContactUsToDiscuss),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, FrontEndDevelopment.GetInTouch);
	}
});

test('Check redirect by "Clutch Review" button in "Front-End Development Services Case Studies" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const frontEndCaseStudiesContainer = driver.getByTestId(FrontEndDevelopment.CaseStudy);
	const clutchReviewButton = frontEndCaseStudiesContainer.getByTestId(Buttons.Clutch);

	await baseDriverSteps.checkRedirectToPage(clutchReviewButton, ClutchReviewLinks.MarkBeare);
});

test('Check redirect by CTA button in "Case Studies" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const caseStudiesContainer = driver.getByTestId(FrontEndDevelopment.CaseStudy);

	await caseStudiesContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.DesignSystemForVideoStreamingPlatform}`,
			Environment.Production
		)
	);
});

test('Check redirect by "Clutch Review" button in "Why Techstack" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const whyTechstackContainer = driver.getByTestId(FrontEndDevelopment.WhyTechstack);

	await baseDriverSteps.checkRedirectToPage(
		whyTechstackContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.Anonymous
	);
});

test('Check redirects by LinkedIn buttons in "Our Front End Development Experts" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const ourFrontEndExperts = driver.getByTestId(FrontEndDevelopment.OurExperts);
	const linkedInButtons = ourFrontEndExperts.getByTestId(Buttons.LinkedIn);

	const buttonUrlMap = new Map([
		[linkedInButtons.nth(0), ExpertsLinkedInLinks.VladyslavUshakov],
		[linkedInButtons.nth(1), ExpertsLinkedInLinks.DmytroBohdanov],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test('Check redirects by Blog buttons in "Our Front End Development Experts" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const ourFrontEndExperts = driver.getByTestId(FrontEndDevelopment.OurExperts);
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);
	const blogButtons = ourFrontEndExperts.getByTestId(Buttons.Blog);

	const buttonUrlMap = new Map([
		[blogButtons.nth(0), `${blogUri}${AuthorsEnum.VladyslavUshakov}`],
		[blogButtons.nth(1), `${blogUri}${AuthorsEnum.DmytroBohdanov}`],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment));
	}
});

test('Check carousel arrows clicks in "Front-End Development Process" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const frontEndProcessContainer = driver.getByTestId(FrontEndDevelopment.FrontEndDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(frontEndProcessContainer);
});

test('Check redirects by arrows in "Related Services" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const relatedServicesContainer = driver.getByTestId(FrontEndDevelopment.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BackEndDevelopment)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment));
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "Front End Development" page @Regression @FrontEndDevelopment @TSWEB-1274', async () => {
	const faqContainer = driver.getByTestId(FrontEndDevelopment.Faq);
	const expectedNumberOfSections = 8;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
