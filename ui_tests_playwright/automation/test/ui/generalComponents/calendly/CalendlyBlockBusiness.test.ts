import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import {calendlySteps} from '../../../../steps/ui/CalendlySteps';
import GeneralContainersMainSite from '../../../../identifiers/mainSite/GeneralContainersMainSite';
import UrlUtils from '../../../../utils/UrlUtils';

interface ExpertData {
	name: string;
	role: string;
	pages: string[];
}

let consultWithUsContainer: Locator;
let getInTouchContainer: Locator;

const testDataProvider: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

const allExperts: ExpertData[] = [
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

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test('Check expert cards from Calendly block on the "Contact us" and "Get a Quote" pages @desktop @mobile @Regression @Calendly @TSWEB-1852', async () => {
	consultWithUsContainer = driver.getByTestId(GeneralContainersMainSite.ConsultWithUs);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);
		const cardElements = await consultWithUsContainer.getByTestId(Container.MemberCard).all();

		const experts = [
			{name: 'Max Levytskyi', role: 'Managing Partner'},
			{name: 'Anton Ivanchenko', role: 'Business Development Manager'},
			{name: 'Artem Marynych', role: 'Chief Growth Officer'},
		];

		expect(cardElements.length).toBe(3);
		for (const expertData of experts) {
			const matchingCard = await calendlySteps.findMatchingMemberCardByName(cardElements, expertData.name);
			if (matchingCard) {
				await calendlySteps.checkMemberCardCalendly(matchingCard, expertData);
				await calendlySteps.checkAppropriateCalendlyModalOpensAndCloses(matchingCard);
			}
		}
	}
});

test('Check expert cards from Calendly section in forms on business website pages @desktop @mobile @Regression @TSWEB-1852', async () => {
	getInTouchContainer = driver.getByTestId(GeneralContainersMainSite.GetInTouch);

	for (const expert of allExperts) {
		const url = UrlUtils.getRandomUrlFromArray(expert.pages);
		await baseDriverSteps.goToUrl(url);
		const memberCard = getInTouchContainer.getByTestId(Container.MemberCard);

		await expect(memberCard).toHaveCount(1);
		await calendlySteps.checkMemberCardCalendly(memberCard, expert);
		await calendlySteps.checkAppropriateCalendlyModalOpensAndCloses(memberCard);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
