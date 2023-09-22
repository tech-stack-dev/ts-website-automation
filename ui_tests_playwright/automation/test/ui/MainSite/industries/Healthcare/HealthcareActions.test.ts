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

test("Check carousel arrows click in 'How We Operate' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const howWeOperateContainer = driver.getByTestId(Healthcare.HowWeOperate);

	await baseDriverSteps.checkCarouselArrowsClick(howWeOperateContainer);
});

test("Check redirects by arrows in 'Core Practices' container from the 'Healthcare' block @Regression @Healthcare @TSWEB-955", async () => {
	const corePracticesContainer = driver.getByTestId(Healthcare.CorePractices);
	const arrows = corePracticesContainer.getByTestId(Container.ContainerSection).getByTestId(Container.Arrow);
	const arrowUrlMap = new Map([
		[arrows.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[arrows.nth(1), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[arrows.nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
		[arrows.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[arrows.nth(4), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[arrows.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[arrows.nth(6), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
	]);

	await baseDriverSteps.checkRedirectToPages(arrowUrlMap, UrlProvider.urlBuilder(UrlPath.Healthcare));
});

test('Check sections expanding and collapsing in "FAQ" container from the "Healthcare" page @Regression @Healthcare @TSWEB-955', async () => {
	const faqContainer = driver.getByTestId(Healthcare.Faq);
	const expectedNumberOfSections = 3;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
