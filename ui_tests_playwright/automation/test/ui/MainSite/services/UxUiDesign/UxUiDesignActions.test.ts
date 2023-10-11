import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import UxUiDesign from '../../../../../identifiers/MainSite/pages/services/UxUiDesign';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import Buttons from '../../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import {Environment} from '../../../../../providers/EnvProvider';
import MainSiteLinks from '../../../../../identifiers/MainSite/MainSiteLinks';
import Links from '../../../../../preconditionsData/Links/Links';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import ExpertsBehanceLinks from '../../../../../preconditionsData/Links/ExpertsBehanceLinks';
import Container from '../../../../../identifiers/Container';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.UiUxDesign));
});

test('Check redirect to clutch in "Success Stories" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const successStoriesContainer = driver.getByTestId(UxUiDesign.SuccessStories);
	await successStoriesContainer.getByTestId(Buttons.Clutch).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ClutchReviewLinks.AnonymousMedicalDevice);
	await newPage.close();
});

test('Check redirect by "Read Full Case Studies" button in "Success Stories" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const successStoriesContainer = driver.getByTestId(UxUiDesign.SuccessStories);

	await successStoriesContainer.getByTestId(MainSiteButtons.ReadFullCaseStudies).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.RedesignPatientDataSystem}`,
			Environment.Production
		)
	);
});

test('Check carousel clicks in "Typical UX/UI Design Workflow" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const typicalUxUiDesignWorkflowContainer = driver.getByTestId(UxUiDesign.TypicalUxUiDesignWorkflow);

	await baseDriverSteps.checkCarouselArrowsClick(typicalUxUiDesignWorkflowContainer);
});

test('Check redirects by links in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const linkUrlMap = new Map([
		[weNeverStopImprovingContainer.getByTestId(MainSiteLinks.Instagram), Links.Instagram],
		[weNeverStopImprovingContainer.getByTestId(MainSiteLinks.Tiktok), Links.TikTokDesign],
	]);

	await baseDriverSteps.checkRedirectToPages(linkUrlMap);
});

test('Check redirects by LinkedIn buttons in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	const linkedInButtons = weNeverStopImprovingContainer.getByTestId(Buttons.LinkedIn);

	const buttonUrlMap = new Map([
		[linkedInButtons.nth(0), ExpertsLinkedInLinks.DmytroDytiuk],
		[linkedInButtons.nth(1), ExpertsLinkedInLinks.YuliaMelnychenko],
		[linkedInButtons.nth(2), ExpertsLinkedInLinks.ElizabethMalygina],
		[linkedInButtons.nth(3), ExpertsLinkedInLinks.HannaZhyhan],
		[linkedInButtons.nth(4), ExpertsLinkedInLinks.YelyzavetaLvova],
	]);

	await baseDriverSteps.checkRedirectToPages(buttonUrlMap);
});

// Unskip after Blog will be stable
test.skip('Check redirect by Blog button in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670 @TSWEB-1061', async () => {
	const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);
	await weNeverStopImprovingContainer.getByTestId(Buttons.Blog).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(
		UrlProvider.urlBuilder(`${UrlPath.AuthorPage}${AuthorsEnum.DmytroDytiuk}`, Environment.Production)
	);
	await newPage.close();
});

test('Check redirect by Behance button in "We Never Stop Improving Your Product" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const weNeverStopImprovingContainer = driver.getByTestId(UxUiDesign.WeNeverStopImprovingYourProduct);

	await weNeverStopImprovingContainer.getByTestId(Buttons.Behance).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toEqual(ExpertsBehanceLinks.DmytroDytuk);
	await newPage.close();
});

test('Check redirect by link in "Related Services" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const relatedServicesContainer = driver.getByTestId(UxUiDesign.RelatedServices);
	await relatedServicesContainer.getByTestId(MainSiteLinks.CaseStudy).click();

	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(
			`${UrlPath.CaseStudies}${CaseStudyPath.OneStopPlatformDesignHospitality}`,
			Environment.Production
		)
	);
});

test('Check redirects by arrows in "Related Services" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
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

	const uxUiPageUrl = UrlProvider.urlBuilder(UrlPath.UiUxDesign);
	await baseDriverSteps.checkRedirectToPages(arrowUrlMap, uxUiPageUrl);
});

test('Check sections expanding and collapsing in "FAQ" container from the "UX/UI Design" page @Regression @UxUiDesign @TSWEB-670', async () => {
	const faqContainer = driver.getByTestId(UxUiDesign.Faq);
	const expectedNumberOfSections = 8;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
