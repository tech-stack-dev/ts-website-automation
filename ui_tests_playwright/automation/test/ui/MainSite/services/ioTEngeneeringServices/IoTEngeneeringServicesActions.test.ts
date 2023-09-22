import { expect, test } from '@playwright/test';
import { qase } from 'playwright-qase-reporter/dist/playwright';
import { driver } from '../../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../../base/step/BaseDriverSteps';
import { AuthorsEnum } from '../../../../../enum/AuthorsEnum';
import { ServicesEnum } from '../../../../../enum/ServicesEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import IoTEngineeringServices from '../../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import { ExpertsLinkedInLinks } from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import { serviceUrl } from '../../../../../preconditionsData/UrlPreconditions';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import { Environment } from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.InternetOfThings]);
});

test('Check redirect by "Read the full Case Study" button in "IoT Engineering Case Studies" container. @Regression @InternetOfThings @TSWEB-695', async () => {
	const ioTEngineeringCaseStudiesContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringCaseStudies);
	await ioTEngineeringCaseStudiesContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click();

	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(`${UrlPath.CaseStudies}${CaseStudyPath.IotSensorsAndImagers}`, Environment.Production)
	);
});

test('Check switching between layers in "IoT Technology Stack by Layers" container. @Regression @InternetOfThings @TSWEB-695', async () => {
	const ioTTechnologyStackByLayersContainer = driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers);
	const layerButtons = await ioTTechnologyStackByLayersContainer.getByTestId(MainSiteButtons.Layer).all();
	const containerBlocks = await ioTTechnologyStackByLayersContainer.getByTestId(Container.ContainerBlock).all();

	for (let i = 0; i < layerButtons.length; i++) {
		const buttonIndex = (layerButtons.length - i) % layerButtons.length;
		await layerButtons[buttonIndex].click();

		for (let j = containerBlocks.length - 1; j < 0; j--) {
			const expectedState = j - 1 === buttonIndex - 1 ? 'false' : 'true';
			await expect(containerBlocks[j]).toHaveAttribute('data-disabled', expectedState);
		}
	}
});

test('Check carousel buttons in "IoT Engineering Process" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const ioTEngineeringProcessContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	await baseDriverSteps.checkCarouselArrowsClick(ioTEngineeringProcessContainer, 3);
});

test('Check LinkedIn redirects in "Our Internet of Things Engineering Experts" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const expectedLinkedInLinks = [
		ExpertsLinkedInLinks.IvanIeremenko,
		ExpertsLinkedInLinks.OleksiiSvystun,
		ExpertsLinkedInLinks.YevheniiKarachevtsev,
	];

	for (let i = 0; i < expertCards.length; i++) {
		const memberCard = expertCards[i];

		await memberCard.getByTestId(Buttons.LinkedIn).click();
		let newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(expectedLinkedInLinks[i]);
		await newPage.close();
	}
});

test('Check Blog link redirects in "Our Internet of Things Engineering Experts" container. @Regression @IoTEngineeringServices @TSWEB-695, @TSWEB-1061', async () => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);

	const expectedBlogLinks = [AuthorsEnum.IvanIeremenko, AuthorsEnum.OleksiiSvystun, AuthorsEnum.YevheniiKarachevtsev];

	for (let i = 0; i < expertCards.length; i++) {
		const memberCard = expertCards[i];

		await memberCard.getByTestId(Buttons.Blog).click();
		const newPage = await driver.DriverContext.waitForEvent('page');

		await expect(newPage).toHaveURL(`${blogUri}${expectedBlogLinks[i]}`);
		await newPage.close();
	}
});

test('Check redirects by arrows in "Related Services" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
	const serviceArrows = await relatedServicesContainer.getByTestId(Container.Arrow).all();
	const arrowUrlMap = new Map([
		[serviceArrows[0], UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[serviceArrows[1], UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[serviceArrows[2], UrlProvider.urlBuilder(UrlPath.AiMl)],
		[serviceArrows[3], UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[serviceArrows[4], UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[serviceArrows[5], UrlProvider.urlBuilder(UrlPath.BigData)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.InternetOfThings));
	}
});

test(qase(982, 'Check navigation to "Get in Touch" form after clicking "Request a quote" button in Info container. @Regression @IoTEngineeringServices @TSWEB-695'), async () => {
	const requestAQuoteButtons = [
		driver.getByTestId(IoTEngineeringServices.Info).getByTestId(MainSiteButtons.RequestAQuote),
		driver
			.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers)
			.getByTestId(MainSiteButtons.RequestAQuote),
		driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess).getByTestId(MainSiteButtons.RequestAQuote),
	];

	for (const button of requestAQuoteButtons) {
		await button.click();

		await expect(driver.getByTestId(IoTEngineeringServices.GetInTouch)).toBeInViewport();

		await driver.Page.evaluate(() => {
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		});
	}
});

test('Check sections expanding and collapsing in "FAQ" container from the "Internet of Things" page @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
	const expectedNumberOfSections = 3;

	await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
