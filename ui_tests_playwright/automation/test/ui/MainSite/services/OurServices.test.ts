import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import OurServices from '../../../../identifiers/MainSite/pages/services/OurServices';
import Container from '../../../../identifiers/Container';
import MainSiteButtons from '../../../../identifiers/MainSite/MainSiteButtons';
import Buttons from '../../../../identifiers/Buttons';
import {ClutchReviewLinks} from '../../../../preconditionsData/Links/ClutchReviewLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
});

test("Check the header from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const info = driver.getByTestId(OurServices.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nOur Services');
	await expect(info.getByTestId(Container.Title)).toHaveText('Full-Cycle Software\nEngineering Services');
	await expect(info.getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
});

test("Check the container title and number from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	await expect(driver.getByTestId(OurServices.Services).getByTestId(Container.ContainerTitle)).toHaveText('Services');
	await expect(driver.getByTestId(OurServices.Services).getByTestId(Container.ContainerNumber)).toHaveText('01');

	await expect(driver.getByTestId(OurServices.TechnologyStack).getByTestId(Container.ContainerTitle)).toHaveText(
		'Technology stack'
	);
	await expect(driver.getByTestId(OurServices.TechnologyStack).getByTestId(Container.ContainerNumber)).toHaveText(
		'02'
	);

	await expect(driver.getByTestId(OurServices.OurApproach).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our approach'
	);
	await expect(driver.getByTestId(OurServices.OurApproach).getByTestId(Container.ContainerNumber)).toHaveText('03');

	await expect(driver.getByTestId(OurServices.Reviews).getByTestId(Container.ContainerTitle)).toHaveText('Reviews');
	await expect(driver.getByTestId(OurServices.Reviews).getByTestId(Container.ContainerNumber)).toHaveText('04');

	await expect(driver.getByTestId(OurServices.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(OurServices.Faq).getByTestId(Container.ContainerNumber)).toHaveText('05');
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

	const allSectionTitles = await servicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Custom Software Development',
		'Cloud & DevOps',
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

	const arrowUrlMap = new Map([
		[servicesContainer.getByTestId(Container.ContainerSection).nth(0), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[
			servicesContainer.getByTestId(Container.ContainerSection).nth(1),
			UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
		],
		[servicesContainer.getByTestId(Container.ContainerSection).nth(2), UrlProvider.urlBuilder(UrlPath.BigData)],
		[
			servicesContainer.getByTestId(Container.ContainerSection).nth(3),
			UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		],
		[servicesContainer.getByTestId(Container.ContainerSection).nth(4), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[servicesContainer.getByTestId(Container.ContainerSection).nth(5), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[servicesContainer.getByTestId(Container.ContainerSection).nth(6), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[servicesContainer.getByTestId(Container.ContainerSection).nth(7), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[
			servicesContainer.getByTestId(Container.ContainerSection).nth(8),
			UrlProvider.urlBuilder(UrlPath.ConsultingServ),
		],
	]);

	for (const [section, url] of arrowUrlMap) {
		await section.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
	}
});

test("Check section titles and navigation bar in 'Technology stack' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const technologyStackContainer = driver.getByTestId(OurServices.TechnologyStack);

	const navigationTabs = [
		technologyStackContainer.getByTestId(MainSiteButtons.FrontEnd),
		technologyStackContainer.getByTestId(MainSiteButtons.Mobile),
		technologyStackContainer.getByTestId(MainSiteButtons.IoT),
		technologyStackContainer.getByTestId(MainSiteButtons.DevOpsCloud),
		technologyStackContainer.getByTestId(MainSiteButtons.AiMlDataScience),
		technologyStackContainer.getByTestId(MainSiteButtons.BackEnd), // To click this item last because it selected by default on page
	];

	const containerBlocks = technologyStackContainer.getByTestId(Container.ContainerBlock);
	const testDataSectionTitles = [
		[
			// Back-End tab
			'.NET Stack',
			'JVM Stack',
			'Node.js stack',
			'Other',
		],
		[
			// Front-End tab
			'Languages',
			'Frameworks',
			'State\nmanagement',
			'Build tools',
			'Markup',
			'Rich content',
		],
		[
			// Mobile tab
			'React Native',
			'Cordova',
			'Flutter',
			'Android',
			'iOS',
		],
		[
			// IoT tab
			'Devices',
			'Gateways',
		],
		[
			// DevOps/Cloud tab
			'Cloud',
			'DevOps',
			'CI/CD',
			'Monitoring',
		],
		[
			// AI&ML/Data science tab
			'Computer vision',
			'Deep learning and machine learning',
			'Data visualization',
			'Data storage & manipulation',
			'Development environment',
		],
	];

	for (let tab = 0; tab < navigationTabs.length; tab++) {
		const currentTab = navigationTabs[tab];
		const currentBlock = containerBlocks.nth(tab);
		const tabSectionTitles = testDataSectionTitles[tab];

		expect(await currentBlock.getAttribute('class')).toBe('content-switcher-content--active');
		await currentTab.click();
		expect(await currentTab.getAttribute('class')).toBe('h3 content-switcher-tab--active');
		expect(currentBlock.getByTestId(Container.SectionTitle)).toHaveText(tabSectionTitles);
	}
});

test("Check section titles and CTA button in 'Our approach' container from the 'Our Services' block @Regression @OurServices @TSWEB-681", async () => {
	const ourApproachContainer = driver.getByTestId(OurServices.OurApproach);

	const allSectionTitles = ourApproachContainer.getByTestId(Container.SectionTitle);
	const testData = ['Domain\nproficiency', 'We are the team', 'Data-driven\ndecisions'];

	await expect(allSectionTitles).toHaveText(testData);

	await ourApproachContainer.getByTestId(MainSiteButtons.AboutUs).click();
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
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
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

test.afterEach(async () => {
	await driver.closeDrivers();
});
