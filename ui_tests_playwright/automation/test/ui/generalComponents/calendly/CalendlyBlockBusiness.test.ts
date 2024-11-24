import {expect, Locator, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import GetAQuote from '../../../../identifiers/mainSite/pages/getAQuote/GetAQuote';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import {calendlySteps} from '../../../../steps/ui/CalendlySteps';
import ContactUs from '../../../../identifiers/mainSite/pages/contactUs/ContactUs';

let getAQuoteConsultWithUsContainer: Locator;
let contactUsConsultWithUsContainer: Locator;
let consultWithUsContainerList: Locator[];

const testDataProvider: string[] = [
	UrlProvider.urlBuilder(UrlPath.GetAQuote),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	getAQuoteConsultWithUsContainer = driver.getByTestId(GetAQuote.ConsultWithUs);
	contactUsConsultWithUsContainer = driver.getByTestId(ContactUs.ConsultWithUs);
	consultWithUsContainerList = [getAQuoteConsultWithUsContainer, contactUsConsultWithUsContainer];
});

test('Check member cards from from Calendly block on the "Contact us" and "Get a Quote" pages @desktop @mobile @Regression @Calendly @TSWEB-1852', async () => {
	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		for (const consultWithUsContainer of consultWithUsContainerList) {
			const cardElements = await consultWithUsContainer.getByTestId(Container.MemberCard).all();

			const allExperts = [
				{name: 'Max Levytskyi', role: 'Managing Partner'},
				{name: 'Anton Ivanchenko', role: 'Business Development Manager'},
				{name: 'Artem Marynych', role: 'Chief Growth Officer'},
			];

			expect(cardElements.length).toBe(allExperts.length);

			for (const expertData of allExperts) {
				const matchingCard = await calendlySteps.findMatchingMemberCardByName(cardElements, expertData.name);
				await calendlySteps.checkMemberCardCalendly(matchingCard, expertData);
				await calendlySteps.checkAppropriateCalendlyModalOpensAndCloses(matchingCard);
			}
		}
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
