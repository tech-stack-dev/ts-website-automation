import {expect, test} from '@playwright/test';
import format from 'format-util';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import IoTEngineeringServices from '../../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.InternetOfThings]);
});

test('Check redirect by "Our Services" breadcrumbs button in header. @Regression @InternetOfThings @TSWEB-695', async () => {
	driver.getByTestId(IoTEngineeringServices.Info).getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
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
	const containerBlocks = await ioTTechnologyStackByLayersContainer.getByTestId(Container.ContainerBlock).all();
	let layerButtonIndex: number = 2;

	for (let i = 0; i < containerBlocks.length; i++) {
		// Check selected Layer
		expect(
			containerBlocks[i],
			`Invalid value of 'data-disabled' attribute for selected Layer ${i}.`
		).toHaveAttribute('data-disabled', 'false');

		// While there is a selected layer, another layers are expected to be disabled. Checked on a random layer
		let randomLayerIndex = getRandomIntInRangeExcluding(0, containerBlocks.length - 1, i);

		expect(
			containerBlocks[randomLayerIndex],
			`Invalid value of 'data-disabled' attribute for not selected Layer ${i + 1}.`
		).toHaveAttribute('data-disabled', 'true');

		if (layerButtonIndex <= containerBlocks.length) {
			await driver.Page.locator(format(IoTEngineeringServices.LayerButton, layerButtonIndex++)).click();
		} else {
			await driver.Page.locator(format(IoTEngineeringServices.LayerButton, 1)).click();
			expect(
				containerBlocks[0],
				`Invalid value of 'data-disabled' attribute for selected Layer ${1}.`
			).toHaveAttribute('data-disabled', 'false');
		}
	}
});

test('Check carousel buttons in "IoT Engineering Prodcess" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
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

test('Check Blog link redirects in "Our Internet of Things Engineering Experts" container. @Regression @IoTEngineeringServices @TSWEB-695, TSWEB-1061', async () => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);

	const expectedBlogLinks = [AuthorsEnum.IvanIeremenko, AuthorsEnum.OleksiiSvystun, AuthorsEnum.YevheniiKarachevtsev];

	for (let i = 0; i < expertCards.length; i++) {
		const memberCard = expertCards[i];

		await memberCard.getByTestId(Buttons.Blog).click();
		let newPage = await driver.DriverContext.waitForEvent('page');

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

function getRandomIntInRangeExcluding(min: number, max: number, excludedNumber: number): number {
	let randomNumber: number;

	do {
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	} while (randomNumber === excludedNumber);

	return randomNumber;
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
