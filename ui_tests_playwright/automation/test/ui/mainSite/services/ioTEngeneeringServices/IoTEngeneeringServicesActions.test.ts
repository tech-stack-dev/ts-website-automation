/* eslint-disable for-direction */
import {expect, test} from '@playwright/test';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {AuthorsEnum} from '../../../../../enum/AuthorsEnum';
import {ExpertiseEnum} from '../../../../../enum/ExpertiseEnum';
import Buttons from '../../../../../identifiers/Buttons';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import IoTEngineeringServices from '../../../../../identifiers/mainSite/pages/services/IoTEngineeringServices';
import {ExpertsLinkedInLinks} from '../../../../../preconditionsData/links/ExpertsLinkedInLinks';
import {expertiseUrl} from '../../../../../preconditionsData/UrlPreconditions';
import CaseStudyPath from '../../../../../providers/CaseStudyPath';
import {Environment} from '../../../../../providers/EnvProvider';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import MainSiteLinks from '../../../../../identifiers/mainSite/MainSiteLinks';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(expertiseUrl[ExpertiseEnum.InternetOfThings]);
});

test(
	qase(
		5073,
		'Check switching between layers in "IoT Technology Stack by Layers" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ioTTechnologyStackByLayersContainer = driver.getByTestId(
			IoTEngineeringServices.IoTTechnologyStackByLayers
		);
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
	}
);

test(
	qase(
		5079,
		'Check redirect by CTA button in "Case Study by Techstack" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const caseStudyContainer = driver.getByTestId(IoTEngineeringServices.CaseStudy);
		await caseStudyContainer.getByTestId(MainSiteButtons.CheckOutHowWeBuildIt).click();
		await driver.Page.waitForLoadState();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(
				`${UrlPath.CaseStudies}${CaseStudyPath.IotSensorsAndImagers}`,
				Environment.Production
			)
		);
	}
);

test(
	qase(
		5097,
		'Check redirects by links in "Industry-specific IoT Solutions" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const industriesWeDevelopContainer = driver.getByTestId(IoTEngineeringServices.IndustrySpecificIoTSolutions);
		const sections = industriesWeDevelopContainer.getByTestId(Container.ContainerSection);

		const linksUrlMap = new Map([
			[
				sections.getByTestId(MainSiteLinks.TransportAndLogistics),
				UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
			],
			[sections.getByTestId(MainSiteLinks.RenewableEnergy), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
			[sections.getByTestId(MainSiteLinks.Healthcare), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		]);

		for (const [link, url] of linksUrlMap) {
			await baseDriverSteps.checkRedirectToPage(link, url, UrlProvider.urlBuilder(UrlPath.InternetOfThings));
		}
	}
);

test(
	qase(
		5103,
		'Check carousel buttons clicks in "IoT Engineering Process" container from the "Internet of Things" page @desktop @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ioTEngineeringProcessContainer = driver.getByTestId(IoTEngineeringServices.IoTEngineeringProcess);
		await baseDriverSteps.checkCarouselArrowsClick(ioTEngineeringProcessContainer, 3);
	}
);

test(
	qase(
		5089,
		'Check redirects by LinkedIn buttons in "Our Internet of Things Engineering Experts" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const ourIoTExpertsContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts);
		const linkedInButtons = ourIoTExpertsContainer.getByTestId(Buttons.LinkedIn);

		const buttonUrlMap = new Map([
			[linkedInButtons.nth(0), ExpertsLinkedInLinks.OleksiiSvystun],
			[linkedInButtons.nth(1), ExpertsLinkedInLinks.YevheniiKarachevtsev],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url);
		}
	}
);

test(
	qase(
		5111,
		'Check redirects by Blog buttons in "Our Internet of Things Engineering Experts" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695 @TSWEB-1061'
	),
	async () => {
		const ourIoTExpertsContainer = driver.getByTestId(IoTEngineeringServices.OurIoTEngineeringExperts);
		const blogButtons = ourIoTExpertsContainer.getByTestId(Buttons.Blog);
		const blogUri = UrlProvider.urlBuilder(UrlPath.AuthorPage);

		const buttonUrlMap = new Map([
			[blogButtons.nth(0), `${blogUri}${AuthorsEnum.OleksiiSvystun}`],
			[blogButtons.nth(1), `${blogUri}${AuthorsEnum.YevheniiKarachevtsev}`],
			[blogButtons.nth(2), `${blogUri}${AuthorsEnum.IvanKononenko}`],
			[blogButtons.nth(3), `${blogUri}${AuthorsEnum.EugeneLypskyi}`],
			[blogButtons.nth(4), `${blogUri}${AuthorsEnum.AndrewKurilenko}`],
		]);

		for (const [button, url] of buttonUrlMap) {
			await baseDriverSteps.checkRedirectToPage(button, url, UrlProvider.urlBuilder(UrlPath.InternetOfThings));
		}
	}
);

test(
	qase(
		5222,
		'Check redirects by arrows in "Related Services" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const relatedServicesContainer = driver.getByTestId(IoTEngineeringServices.RelatedServices);
		const serviceArrows = await relatedServicesContainer.getByTestId(Container.Arrow).all();
		const arrowUrlMap = new Map([
			[serviceArrows[0], UrlProvider.urlBuilder(UrlPath.CustomDev)],
			[serviceArrows[1], UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
			[serviceArrows[2], UrlProvider.urlBuilder(UrlPath.AiDevelopment)],
			[serviceArrows[3], UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
			[serviceArrows[4], UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
			[serviceArrows[5], UrlProvider.urlBuilder(UrlPath.BigData)],
		]);

		for (const [arrow, url] of arrowUrlMap) {
			await baseDriverSteps.checkRedirectToPage(arrow, url, UrlProvider.urlBuilder(UrlPath.InternetOfThings));
		}
	}
);

test(
	qase(
		5118,
		'Check navigation to "Get in Touch" container after clicking CTA buttons from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const requestAQuoteButtons = [
			driver.getByTestId(IoTEngineeringServices.Info).getByTestId(MainSiteButtons.GetYourCustomIotQuote),
			driver
				.getByTestId(IoTEngineeringServices.IoTTechnologyStackByLayers)
				.getByTestId(MainSiteButtons.RequestAQuote),
			driver
				.getByTestId(IoTEngineeringServices.IoTEngineeringProcess)
				.getByTestId(MainSiteButtons.GetYourQuoteNow),
		];
		for (const button of requestAQuoteButtons) {
			await baseDriverSteps.checkScrollToContainerByCtaButtonClick(button, IoTEngineeringServices.GetInTouch);
		}
	}
);

test(
	qase(
		5145,
		'Check sections expanding and collapsing in "FAQ" container from the "Internet of Things" page @desktop @mobile @Regression @InternetOfThings @TSWEB-695'
	),
	async () => {
		const faqContainer = driver.getByTestId(IoTEngineeringServices.Faq);
		const expectedNumberOfSections = 3;

		await baseDriverSteps.checkFaqSectionsExpandingAndCollapsing(faqContainer, expectedNumberOfSections);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
