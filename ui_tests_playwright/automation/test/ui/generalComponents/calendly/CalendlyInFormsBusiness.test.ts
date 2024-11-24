import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {calendlySteps} from '../../../../steps/ui/CalendlySteps';

import HomePage from '../../../../identifiers/mainSite/pages/HomePage';
import {DevOpsAsAService} from '../../../../identifiers/mainSite/pages/services/DevOpsAsAService';
import AiDevelopment from '../../../../identifiers/mainSite/pages/services/AiDevelopment';
import IoTEngineeringServices from '../../../../identifiers/mainSite/pages/services/IoTEngineeringServices';
import AboutUs from '../../../../identifiers/mainSite/pages/company/AboutUs';
import Healthcare from '../../../../identifiers/mainSite/pages/industries/Healthcare';
import RenewableEnergy from '../../../../identifiers/mainSite/pages/industries/RenewableEnergy';
import TransportationAndLogistics from '../../../../identifiers/mainSite/pages/industries/TransportationAndLogistics';
import UxUiDesign from '../../../../identifiers/mainSite/pages/services/UxUiDesign';
import MobileDevService from '../../../../identifiers/mainSite/pages/services/MobileDevService';
import BigDataAndAnalytics from '../../../../identifiers/mainSite/pages/services/BigDataAndAnalytics';
import HowWeWork from '../../../../identifiers/mainSite/pages/company/HowWeWork';
import Pricing from '../../../../identifiers/mainSite/pages/Pricing';
import ConsultingService from '../../../../identifiers/mainSite/pages/services/ConsultingService';
import CloudDevelopment from '../../../../identifiers/mainSite/pages/services/CloudDevelopment';
import DigitalTransformation from '../../../../identifiers/mainSite/pages/services/DigitalTransformation';
import FrontEndDevelopment from '../../../../identifiers/mainSite/pages/services/FrontEndDevelopment';
import BackEndServices from '../../../../identifiers/mainSite/pages/services/BackEndServices';
import QaAsAService from '../../../../identifiers/mainSite/pages/services/QaAsAService';
import {CustomDev} from '../../../../identifiers/mainSite/pages/services/CustomDev';

interface ExpertData {
	name: string;
	role: string;
	pages: string[];
}
interface PageObject {
	GetInTouch: string;
	[key: string]: any;
}

const experts: ExpertData[] = [
	{
		name: 'Max Levytsky',
		role: 'Managing Partner',
		pages: [
			UrlProvider.webSiteUrl(),
			UrlProvider.urlBuilder(UrlPath.DevOpsServ),
			UrlProvider.urlBuilder(UrlPath.InternetOfThings),
			UrlProvider.urlBuilder(UrlPath.AiDevelopment),
			UrlProvider.urlBuilder(UrlPath.AboutUs),
		],
	},
	{
		name: 'Anzhelika Grebennikova',
		role: 'Global Partnership Manager',
		pages: [
			UrlProvider.urlBuilder(UrlPath.Healthcare),
			UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
			UrlProvider.urlBuilder(UrlPath.TransportAndLogist),
		],
	},
	{
		name: 'Anton Ivanchenko',
		role: 'Business Development Manager',
		pages: [
			UrlProvider.urlBuilder(UrlPath.UiUxDesign),
			UrlProvider.urlBuilder(UrlPath.MobileDev),
			UrlProvider.urlBuilder(UrlPath.BigData),
			UrlProvider.urlBuilder(UrlPath.HowWeWork),
			UrlProvider.urlBuilder(UrlPath.Pricing),
			UrlProvider.urlBuilder(UrlPath.ConsultingServ),
		],
	},
	{
		name: 'Artem Marynych',
		role: 'Chief Growth Officer',
		pages: [
			UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
			UrlProvider.urlBuilder(UrlPath.DigitalTransform),
			UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
			UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
			UrlProvider.urlBuilder(UrlPath.QaAsAServ),
			UrlProvider.urlBuilder(UrlPath.CustomDev),
		],
	},
];

// Map URLs to their corresponding page objects
const pageMap = new Map<string, PageObject>([
	[UrlProvider.webSiteUrl(), HomePage],
	[UrlProvider.urlBuilder(UrlPath.DevOpsServ), DevOpsAsAService],
	[UrlProvider.urlBuilder(UrlPath.InternetOfThings), IoTEngineeringServices],
	[UrlProvider.urlBuilder(UrlPath.AiDevelopment), AiDevelopment],
	[UrlProvider.urlBuilder(UrlPath.AboutUs), AboutUs],
	[UrlProvider.urlBuilder(UrlPath.Healthcare), Healthcare],
	[UrlProvider.urlBuilder(UrlPath.RenewableEnergy), RenewableEnergy],
	[UrlProvider.urlBuilder(UrlPath.TransportAndLogist), TransportationAndLogistics],
	[UrlProvider.urlBuilder(UrlPath.UiUxDesign), UxUiDesign],
	[UrlProvider.urlBuilder(UrlPath.MobileDev), MobileDevService],
	[UrlProvider.urlBuilder(UrlPath.BigData), BigDataAndAnalytics],
	[UrlProvider.urlBuilder(UrlPath.HowWeWork), HowWeWork],
	[UrlProvider.urlBuilder(UrlPath.Pricing), Pricing],
	[UrlProvider.urlBuilder(UrlPath.ConsultingServ), ConsultingService],
	[UrlProvider.urlBuilder(UrlPath.CloudDevelopment), CloudDevelopment],
	[UrlProvider.urlBuilder(UrlPath.DigitalTransform), DigitalTransformation],
	[UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment), FrontEndDevelopment],
	[UrlProvider.urlBuilder(UrlPath.BackEndDevelopment), BackEndServices],
	[UrlProvider.urlBuilder(UrlPath.QaAsAServ), QaAsAService],
	[UrlProvider.urlBuilder(UrlPath.CustomDev), CustomDev],
]);

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test('Check expert cards from Calendly section in forms on business pages @desktop @mobile @Regression @TSWEB-1852', async () => {
	for (const expert of experts) {
		for (const url of expert.pages) {
			await baseDriverSteps.goToUrl(url);

			const pageObject = pageMap.get(url);
			if (!pageObject) {
				throw new Error(`No page object found for URL: ${url}`);
			}

			const getInTouchContainer = driver.getByTestId(pageObject.GetInTouch);
			const memberCard = getInTouchContainer.locator('.expert-container');

			await expect(memberCard, `Expert card not found on page ${url}`).toHaveCount(1);
			await calendlySteps.checkMemberCardCalendlyInForm(memberCard, expert);
			await calendlySteps.checkAppropriateCalendlyModalOpensAndCloses(memberCard);
		}
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
