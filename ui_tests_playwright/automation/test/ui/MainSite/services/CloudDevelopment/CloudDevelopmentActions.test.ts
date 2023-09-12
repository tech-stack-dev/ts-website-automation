import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import CloudDevelopment from '../../../../../identifiers/MainSite/pages/services/CloudDevelopment';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test("Check redirect by 'Read Full Case Study' button in 'Industry-Specific Solution' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const industrySpecificSolutionContainer = driver.getByTestId(CloudDevelopment.IndustrySpecificSolution);

	await industrySpecificSolutionContainer.getByTestId(MainSiteButtons.ReadFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.CloudPlatformForEvCharging}`,
			Environment.Production
		)
	);
});

test("Check redirect by links in 'Industries We Serve' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const industriesWeServeContainer = driver.getByTestId(CloudDevelopment.IndustriesWeServe);
	const sections = industriesWeServeContainer.getByTestId(Container.ContainerSection);

	const linksUrlMap = new Map([
		[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[sections.getByTestId(MainSiteLinks.TransportAndLogistics), UrlProvider.urlBuilder(UrlPath.TransportAndLogist)],
		[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
	]);
	await baseDriverSteps.checkRedirectToPages(linksUrlMap, UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test("Check redirect to clutch in 'Our Approach to Cloud App Development' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourApproachToCloudAppDevelopmentContainer = driver.getByTestId(
		CloudDevelopment.OurApproachToCloudAppDevelopment
	);
	const clutchButton = ourApproachToCloudAppDevelopmentContainer.getByTestId(Buttons.Clutch);
	await clutchButton.click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.MarkBeare);
	await newPage.close();
});

test("Check redirects by LinkedIn buttons in 'Our Leading Cloud Experts' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourLeadingCloudExperts = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const buttonUrlMap = new Map([
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.IvanYeremenko],
		[ourLeadingCloudExperts.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.VladyslavUshakov],
	]);

	await baseDriverSteps.checkRedirectToPages(buttonUrlMap);
});

// Unskip after Blog will be stable in scope of TSWEB-1061
test.skip("Check redirects by Blog buttons in 'Our Leading Cloud Experts' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const ourLeadingCloudExperts = driver.getByTestId(CloudDevelopment.OurLeadingCloudExperts);
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);
	const buttonUrlMap = new Map([
		[ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(0), `${blogUri}${AuthorsEnum.IvanIeremenko}`],
		[ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(1), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
		[ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(2), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
		[ourLeadingCloudExperts.getByTestId(Buttons.Blog).nth(3), `${blogUri}${AuthorsEnum.VladyslavUshakov}`],
	]);

	await baseDriverSteps.checkRedirectToPages(buttonUrlMap);
});

test("Check redirects by arrows in 'Related Services' container from the 'Cloud Development' page @Regression CloudDevelopment @TSWEB-692", async () => {
	const relatedServicesContainer = driver.getByTestId(CloudDevelopment.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);

	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	await baseDriverSteps.checkRedirectToPages(arrowUrlMap, UrlProvider.urlBuilder(UrlPath.CloudDevelopment));
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
