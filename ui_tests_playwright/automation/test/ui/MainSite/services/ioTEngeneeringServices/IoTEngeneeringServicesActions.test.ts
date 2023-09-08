import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import UrlProvider from '../../../../../providers/UrlProvider';
import UrlPath from '../../../../../providers/UrlPath';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import IoTEngineeringServices from '../../../../../identifiers/MainSite/pages/services/IoTEngineeringServices';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import format from 'format-util';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/Links/ExpertsLinkedInLinks';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.InternetOfThings]);
});

test('Check redirect by "Read the full Case Study" button in "IoT Engineering Case Studies" container. @Regression @InternetOfThings @TSWEB-695', async () => {
	const ioTEngineeringCaseStudiesContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringCaseStudies);
	await ioTEngineeringCaseStudiesContainer.getByTestId(MainSiteButtons.ReadTheFullCaseStudy).click();

	await baseDriverSteps.checkUrl(
		UrlProvider.urlBuilder(UrlPath.CaseStudies + CaseStudyPath.IotSensorsAndImagers, Environment.Production)
	);
});

test('Check switching between layers in "IoT Technology Stack by Layers" container. @Regression @InternetOfThings @TSWEB-695', async () => {
	const ioTTechnologyStackByLayersContainer = driver.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers);
	const containerBlocks = await ioTTechnologyStackByLayersContainer.getByTestId(Container.ContainerBlock).all();
	let layerButtonIndex: number = 2;

	for (let i = 0; i < containerBlocks.length; i++) {
		// Check selected Layer
		expect(
			await containerBlocks[i].getAttribute('data-disabled'),
			`Invalid value of 'data-disabled' attribute for selected Layer ${containerBlocks[i]}`
		).toEqual('false');

		//While there is a selected layer, another layers are expected to be disabled. Checked on random layer
		let randomLayerIndex = getRandomIntInRangeExcluding(0, containerBlocks.length - 1, i);

		expect(
			await containerBlocks[randomLayerIndex].getAttribute('data-disabled'),
			`Invalid value of 'data-disabled' attribute for not selected Layer ${containerBlocks[i + 1]}`
		).toEqual('true');

		if (layerButtonIndex <= containerBlocks.length) {
			await driver.Page.locator(format(IoTEngineeringServices.LayerButton, layerButtonIndex++)).click();
		} else {
			await driver.Page.locator(format(IoTEngineeringServices.LayerButton, 1)).click();
			expect(
				await containerBlocks[0].getAttribute('data-disabled'),
				`Invalid value of 'data-disabled' attribute for selected Layer ${containerBlocks[0]}`
			).toEqual('false');
		}
	}
});

test("Check carousel buttons in 'IoT Engineering Prodcess' container. @Regression @IoTEngineeringServices @TSWEB-695", async () => {
	const ioTEngineeringProcessContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
	await baseDriverSteps.checkCarouselArrowsClick(ioTEngineeringProcessContainer, 3);
});

test('Check social link redirects in "Our Internet of Things Engineering Experts" container. @Regression @IoTEngineeringServices @TSWEB-695', async () => {
	const expertCards = await driver.getByTestId(Container.MemberCard).all();
	const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage, Environment.Production);

	const expectedMemberCardsLinks: {blogLink: string; linkedInLink: string}[] = [
		{blogLink: blogUri + AuthorsEnum.IvanIeremenko, linkedInLink: ExpertsLinkedInLinks.IvanIeremenko},
		{blogLink: blogUri + AuthorsEnum.OleksiiSvystun, linkedInLink: ExpertsLinkedInLinks.OleksiiSvystun},
		{blogLink: blogUri + AuthorsEnum.YevheniiKarachevtsev, linkedInLink: ExpertsLinkedInLinks.YevheniiKarachevtsev},
	];

	for (let i = 0; i < expertCards.length; i++) {
		const memberCard = expertCards[i];

		await memberCard.getByTestId(Buttons.Blog).click();
		let newPage = await driver.DriverContext.waitForEvent('page');

		await expect(newPage).toHaveURL(expectedMemberCardsLinks[i].blogLink);
		await newPage.close();

		await memberCard.getByTestId(Buttons.LinkedIn).click();
		newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(expectedMemberCardsLinks[i].linkedInLink);
		await newPage.close();
	}
});


test("Check redirects by arrows in 'Related Services' container. @Regression @IoTEngineeringServices @TSWEB-695", async () => {
	const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
	const serviceArrors = await relatedServicesContainer.getByTestId(Container.Arrow).all();
	const arrowUrlMap = new Map([
		[serviceArrors[0], UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[serviceArrors[1], UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[serviceArrors[2], UrlProvider.urlBuilder(UrlPath.AiMl)],
		[serviceArrors[3], UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
		[serviceArrors[4], UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[serviceArrors[5], UrlProvider.urlBuilder(UrlPath.BigData)],
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
