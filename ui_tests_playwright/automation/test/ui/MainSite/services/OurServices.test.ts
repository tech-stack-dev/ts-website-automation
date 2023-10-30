import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import OurServices from '../../../../identifiers/mainSite/pages/services/OurServices';
import TechnologyStackData from '../../../../preconditionsData/technologyStack/TechnologyStackData';
import {ClutchReviewLinks} from '../../../../preconditionsData/links/ClutchReviewLinks';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
});

test("Check the header from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const info = driver.getByTestId(OurServices.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services');
	await expect(info.getByTestId(Container.Title)).toHaveText('Full-Cycle Software\nEngineering Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toHaveText('Request a quote');
});

test("Check the container title and number from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const containers = [
		driver.getByTestId(OurServices.Services),
		driver.getByTestId(OurServices.TechnologyStack),
		driver.getByTestId(OurServices.OurApproach),
		driver.getByTestId(OurServices.Reviews),
		driver.getByTestId(OurServices.Faq),
		driver.getByTestId(OurServices.GetInTouch),
	];

	const expectedData = [
		['Services', '01'],
		['Technology stack', '02'],
		['Our approach', '03'],
		['Reviews', '04'],
		['FAQ', '05'],
		['Get in Touch', '06'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test("Check section titles and numbers in 'Services' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const servicesContainer = driver.getByTestId(OurServices.Services);

	await expect(servicesContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
	]);

	const allSectionTitles = servicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Custom Software Development',
		'Cloud Development',
		'Big Data & Analytics',
		'Internet of Things',
		'Artificial Intelligence & Machine Learning',
		'Mobile Development',
		'UI/UX Design',
		'QA as a Service',
		'Consulting Service',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check redirects by sections in 'Services' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const servicesContainer = driver.getByTestId(OurServices.Services);
	const servicresSections = servicesContainer.getByTestId(Container.ContainerSection);
	const arrowUrlMap = new Map([
		[servicresSections.nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[servicresSections.nth(1), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[servicresSections.nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
		[servicresSections.nth(3), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[servicresSections.nth(4), UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
		[servicresSections.nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[servicresSections.nth(6), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[servicresSections.nth(7), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[servicresSections.nth(8), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
	]);

	const ourServicesUrl = UrlProvider.urlBuilder(UrlPath.OurServices);

	for (const [arrow, url] of arrowUrlMap) {
		await baseDriverSteps.checkRedirectToPage(arrow, url, ourServicesUrl);
	}
});

test("Check section titles and navigation bar in 'Technology stack' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const technologyStackContainer = driver.getByTestId(OurServices.TechnologyStack);

	const navigationTabs = await TechnologyStackData.getTechnologyStackTabs(technologyStackContainer);
	const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = TechnologyStackData.SectionTitles;

	await baseDriverSteps.checkTechnologyStackTabsAndSectionTitles(
		navigationTabs,
		containerBlocks,
		testDataSectionTitles
	);
});

test("Check section titles and CTA button in 'Our approach' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const ourApproachContainer = driver.getByTestId(OurServices.OurApproach);

	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Domain\nproficiency', 'We are the team', 'Data-driven\ndecisions'];

	await expect(allSectionTitles).toHaveText(testData);

	const aboutUsButton = ourApproachContainer.getByTestId(MainSiteButtons.AboutUs);

	await expect(aboutUsButton).toHaveText('About us');

	await aboutUsButton.click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
});

test("Check redirect by 'Clutch Review' buttons in 'Reviews' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const reviewsContainer = driver.getByTestId(OurServices.Reviews);
	const clutchReviewButtons = reviewsContainer.getByTestId(Buttons.Clutch);

	const clutchButtonUrlMap = new Map([
		[clutchReviewButtons.nth(0), ClutchReviewLinks.MarkBeare],
		[clutchReviewButtons.nth(1), ClutchReviewLinks.AnonymousPeerToPeer],
		[clutchReviewButtons.nth(2), ClutchReviewLinks.AnonymousMedicalDevice],
	]);

	for (const [button, url] of clutchButtonUrlMap) {
		await baseDriverSteps.checkRedirectToPage(button, url);
	}
});

test("Check section titles in 'FAQ' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const faqContainer = driver.getByTestId(OurServices.Faq);

	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'What work models do we support?',
		'Is product scope estimation free?',
		'Where are we located?',
		'How long does it take to build a software product with Techstack?',
		'Are all of our engineers in Ukraine, or do we hire worldwide?',
		'Can we provide individual engineers for staff augmentation?',
		'How long does it take to hire a product starter engineer?',
		'Have we worked with startups before?',
		'Do we work with fixed-cost projects?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test('Check sections expanding and collapsing in "FAQ" container from the "Our Services" page @Regression @OurServices @TSWEB-681', async () => {
	const faqContainer = driver.getByTestId(OurServices.Faq);
	const expectedNumberOfSections = 9;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test('Check navigation to "Get in Touch" container after clicking CTA button from the "Our Services" page @Regression @OurServices @TSWEB-681', async () => {
	const requestAQuoteButton = driver.getByTestId(OurServices.Info).getByTestId(MainSiteButtons.RequestAQuote);

	await baseDriverSteps.checkScrollToContainerByCtaButtonClick(requestAQuoteButton, OurServices.GetInTouch);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
