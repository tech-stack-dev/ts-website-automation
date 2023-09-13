import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import BigDataAndAnalytics from '../../../../../identifiers/MainSite/pages/services/BigDataAndAnalytics';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.BigData));
});

test("Check redirect by 'Read more about Solution' button in 'Big Data Case Studies' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const bigDataCaseStudiesContainer = driver.getByTestId(BigDataAndAnalytics.BigDataCaseStudies);

	await bigDataCaseStudiesContainer.getByTestId(MainSiteButtons.ReadMoreAboutSolution).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.VideoBasedQualityControl}`,
			Environment.Production
		)
	);
});

test("Check redirect by links in 'Industry-specific Big Data Solutions' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const industriesSpecificContainer = driver.getByTestId(BigDataAndAnalytics.IndustrySpecificBigDataSolutions);

	const linksUrlMap = new Map([
		[
			industriesSpecificContainer.getByTestId(MainSiteLinks.TransportAndLogistics),
			UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
		],
		[industriesSpecificContainer.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[
			industriesSpecificContainer.getByTestId(MainSiteLinks.RenewableEnergy),
			UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
		],
	]);
	await baseDriverSteps.checkRedirectToPages(linksUrlMap, UrlProvider.urlBuilder(UrlPath.BigData));
});

test("Check redirect to clutch in 'Why Choose Techstack’s Big Data Software Development Services?' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const whyChooseTechstackBigDataContainer = driver.getByTestId(
		BigDataAndAnalytics.WhyChooseTechstackBigDataServices
	);
	await whyChooseTechstackBigDataContainer.getByTestId(Buttons.Clutch).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.MarkBeare);
	await newPage.close();
});

test("Check redirects by LinkedIn buttons in 'Our Experts' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
	const buttonUrlMap = new Map([
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.OleksandrBezrukov],
		[ourExpertsContainer.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.IvanYeremenko],
	]);

	await baseDriverSteps.checkRedirectToPages(buttonUrlMap);
});

test("Check redirects by Blog buttons in in 'Our Experts' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693 @TSWEB-1061", async () => {
	const ourExpertsContainer = driver.getByTestId(BigDataAndAnalytics.OurExperts);
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);
	const buttonUrlMap = new Map([
		[ourExpertsContainer.getByTestId(Buttons.Blog).nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
		[ourExpertsContainer.getByTestId(Buttons.Blog).nth(1), `${blogUri}${AuthorsEnum.YevheniiKarachevtsev}`],
		[ourExpertsContainer.getByTestId(Buttons.Blog).nth(2), `${blogUri}${AuthorsEnum.OleksandrBezrukov}`],
		[ourExpertsContainer.getByTestId(Buttons.Blog).nth(3), `${blogUri}${AuthorsEnum.IvanYeremenko}`],
	]);

	await baseDriverSteps.checkRedirectToPages(buttonUrlMap);
});

test("Check redirects by arrows in 'Related Services' container from the 'Big Data & Analytics' page @Regression @BigDataAndAnalytics @TSWEB-693", async () => {
	const relatedServicesContainer = driver.getByTestId(BigDataAndAnalytics.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);

	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	await baseDriverSteps.checkRedirectToPages(arrowUrlMap, UrlProvider.urlBuilder(UrlPath.BigData));
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
