import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../../identifiers/Buttons';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import Healthcare from '../../../../../identifiers/MainSite/pages/industries/Healthcare';
import {ClutchReviewLinks} from '../../../../../preconditionsData/Links/ClutchReviewLinks';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {Environment} from '../../../../../providers/EnvProvider';
import Container from '../../../../../identifiers/Container';
import ExternalSourceLinks from '../../../../../preconditionsData/Links/ExternalSourceLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Healthcare));
});

test("Check redirect by 'Clutch Review' button in 'Beats Screening Module by Techstack' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const beatsScreeningModuleContainer = driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack);

	await beatsScreeningModuleContainer.getByTestId(Buttons.Clutch).click();
	const newPage = await driver.DriverContext.waitForEvent('page');
	expect(newPage.url()).toContain(ClutchReviewLinks.AnonymousMedicalDevice);
});

test("Check redirect by 'Read the full Case Study' button in 'Beats Screening Module by Techstack' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const beatsScreeningModuleContainer = driver.getByTestId(Healthcare.BeatsScreeningModuleByTechstack);

	await beatsScreeningModuleContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click();
	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(`${UrlPath.CaseStudies}${CaseStudyPath.BeatsScreeningModule}`, Environment.Production)
	);
});

test("Check redirect by links in 'Most Recent Industry Facts' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
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
});

test("Check carousel sections, arrows and 'Schedule a meeting' button in 'How We Operate' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);
	const carousel = howWeOperateContainer.getByTestId(Container.ContainerCarousel);

	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Make\ncontact',
		'Speak with\na tech expert',
		'Offering a service solution proposal',
		'Contract\nsigning',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'Step 1',
		'Step 2',
		'Step 3',
		'Step 4',
	]);

	await baseDriverSteps.checkCarouselArrowsClick(howWeOperateContainer);

	await expect(howWeOperateContainer.getByTestId(MainSiteButtons.ScheduleAMeeting)).toBeVisible();
});

test("Check redirects by arrows in 'Core Practices' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);
	const containerSection = corePracticesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.Healthcare));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
