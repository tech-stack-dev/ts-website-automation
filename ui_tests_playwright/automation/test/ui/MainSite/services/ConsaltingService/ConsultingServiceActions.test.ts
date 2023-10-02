import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import ConsultingService from '../../../../../identifiers/MainSite/pages/services/ConsultingService';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import {Environment} from '../../../../../providers/EnvProvider';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import Links from '../../../../../preconditionsData/Links/Links';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test("Check carousel sections and arrows in 'Consulting process' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingProcessContainer = driver.getByTestId(ConsultingService.ConsultingProcess);
	const carousel = consultingProcessContainer.getByTestId(Container.ContainerCarousel);
	const allSectionTitles = await carousel.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Discovery', 'Analysis', 'Brainstorming', 'Presentation', 'Implementation', 'Touch base'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await carousel.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
	]);

	await baseDriverSteps.checkCarouselArrowsClick(consultingProcessContainer);
});

// Unskip after Blog will be stable
test.skip("Check redirects by buttons in 'Consulting experts' container from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
	const buttonUrlMap = new Map([
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(0), ExpertsLinkedInLinks.IvanIeremenko],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(0),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanIeremenko,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(1), ExpertsLinkedInLinks.OleksiiSvystun],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(1),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.OleksiiSvystun,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(2), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(2),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.YevheniiKarachevtsev,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(3), ExpertsLinkedInLinks.VitaliiDolotov],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(3),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.VitaliiDolotov,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(4), ExpertsLinkedInLinks.IvanYeremenko],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(4),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.IvanYeremenko,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(5), ExpertsLinkedInLinks.DmytroDytiuk],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(5),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroDytiuk,
		],
		[consultingExpertsContainer.getByTestId(Buttons.LinkedIn).nth(6), ExpertsLinkedInLinks.DmytroShtapauk],
		[
			consultingExpertsContainer.getByTestId(Buttons.Blog).nth(6),
			UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production) + AuthorsEnum.DmytroShtapauk,
		],
	]);

	for (const [button, url] of buttonUrlMap.entries()) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check section titles and redirects in 'Our approach' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const ourApproachContainer = driver.getByTestId(ConsultingService.OurApproach);
	const allSectionTitles = await ourApproachContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Open source contributions', 'Global certifications', 'Profound experience'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	ourApproachContainer.getByTestId(Container.Arrow).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain(Links.Nuget);
});

test("Check redirects by arrows in 'Related Services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
	const containerSection = relatedServicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.first().click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.ConsultingServ));
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "Consulting service" page @Regression @ConsultingService @TSWEB-697', async () => {
	const faqContainer = driver.getByTestId(ConsultingService.Faq);
	const expectedNumberOfSections = 5;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA buttons from the "Consulting service" page @Regression @ConsultingService @TSWEB-697', async () => {
	const ctaButtons = [
		driver.getByTestId(ConsultingService.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(ConsultingService.RelatedServices).getByTestId(MainSiteButtons.RequestAQuote),
	];

	for (const button of ctaButtons) {
		await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, ConsultingService.GetInTouch);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
