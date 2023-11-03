import {test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import CloudDevelopment from '../../../../../identifiers/mainSite/pages/services/CloudDevelopment';
import {ClutchReviewLinks} from '../../../../../preconditionsData/links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test('Check redirect by CTA button in "Industry-Specific Solution" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const industrySpecificSolutionContainer = driver.getByTestId(CloudDevelopment.IndustrySpecificSolution);

	await industrySpecificSolutionContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.CloudPlatformForEvCharging}`,
			Environment.Production
		)
	);
});

test('Check redirect by links in "Industries We Serve" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const industriesWeServeContainer = driver.getByTestId(CloudDevelopment.IndustriesWeServe);
	const sections = industriesWeServeContainer.getByTestId(Container.ContainerSection);

	const linksUrlMap = new Map([
		[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[sections.getByTestId(MainSiteLinks.TransportAndLogistics), UrlProvider.urlBuilder(UrlPath.TransportAndLogist)],
		[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
	]);

	for (const [link, url] of linksUrlMap) {
		await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
	}
});

test('Check redirect by "Clutch Review" button in "Our Approach to Cloud App Development" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(CloudDevelopment.OurApproach);

	await baseDriverSteps.checkRedirectToPage(
		ourApproachToCloudAppDevelopmentContainer.getByTestId(Buttons.Clutch),
		ClutchReviewLinks.MarkBeare
	);
});

test('Check redirects by LinkedIn buttons in "Our Leading Cloud Experts" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const ourLeadingCloudExperts = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const linkedInButtons = ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn);

	const buttonUrlMap = new Map([
		[linkedInButtons.nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[linkedInButtons.nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[linkedInButtons.nth(2), ExpertsLinkedInLinks.IvanYeremenko],
		[linkedInButtons.nth(3), ExpertsLinkedInLinks.VladyslavUshakov],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test('Check redirects by Blog buttons in "Our Leading Cloud Experts" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692 @TSWEB-1061', async () => {
	const ourLeadingCloudExperts = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);
	const blogButtons = ourLeadingCloudExperts.getByTestId(Buttons.Blog);

	const buttonUrlMap = new Map([
		[blogButtons.nth(0), `${blogUri}${AuthorsEnum.IvanIeremenko}`],
		[blogButtons.nth(1), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
		[blogButtons.nth(2), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
		[blogButtons.nth(3), `${blogUri}${AuthorsEnum.VladyslavUshakov}`],
	]);

	for (const [button, url] of buttonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
	}
});

test('Check redirects by arrows in "Related Services" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const relatedServicesContainer = driver.getByTestId(CloudDevelopment.RelatedServices);
	const arrows = relatedServicesContainer.getByTestId(Container.Arrow);

	const arrowUrlMap = new Map([
		[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.BigData)],
		[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const faqContainer = driver.getByTestId(CloudDevelopment.Faq);
	const expectedNumberOfSections = 7;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Cloud Development" page @Regression @CloudDevelopment @TSWEB-692', async () => {
	const ctaButtons = [
		driver.getByTestId(CloudDevelopment.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver
			.getByTestId(CloudDevelopment.CloudComputingDevelopmentBenefits)
			.getByTestId(MainSiteButtons.RequestMoreInformation),
		driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts).getByTestId(MainSiteButtons.ScheduleAConsultation),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, CloudDevelopment.GetInTouch);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
