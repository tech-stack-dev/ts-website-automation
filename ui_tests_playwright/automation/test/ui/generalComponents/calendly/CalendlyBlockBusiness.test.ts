import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import {calendlySteps} from '../../../../steps/ui/CalendlySteps';
import GeneralContainersMainSite from '../../../../identifiers/mainSite/GeneralContainersMainSite';
import UrlUtils from '../../../../utils/UrlUtils';
import {allExpertsList} from '../../../../dto/ExpertDto';

let consultWithUsContainer: Locator;
let getInTouchContainer: Locator;

const testDataProvider: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test('Check expert cards from Calendly block on the "Contact us" and "Get a Quote" pages @desktop @mobile @Regression @Calendly @TSWEB-1852', async () => {
	consultWithUsContainer = driver.getByTestId(GeneralContainersMainSite.ConsultWithUs);

	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);
		const cardElements = await consultWithUsContainer.getByTestId(Container.MemberCard).all();
		expect(cardElements.length).toBe(3);

		// for (const expertData of allExpertsList) {
		for (const originalExpertData of allExpertsList) {
			const expertData = {...originalExpertData};
			expertData.name = expertData.name === 'Max Levytsky' ? 'Max Levytskyi' : expertData.name;
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

	for (const expert of allExpertsList) {
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
