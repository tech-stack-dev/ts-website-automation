import { Locator, expect, test } from '@playwright/test';
import { driver } from '../../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../../base/step/BaseDriverSteps';
import { ColorsEnum } from '../../../../../enum/ColorsEnum';
import { CompanyEnum } from '../../../../../enum/CompanyEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import { companyUrl } from '../../../../../preconditionsData/UrlPreconditions';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import { qase } from 'playwright-qase-reporter/dist/playwright';

let header: Locator;
let logo: Locator;
let buttonHeaderslist: Locator[];
let industriesDropdownButton: Locator;
let servicesDropdownButton: Locator;
let companyDropdownButton: Locator;
let pricingButton: Locator;

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.Healthcare),
	UrlProvider.urlBuilder(UrlPath.QaAsAServ),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.BackEndDevelopment),
	UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();

	header = driver.getByTestId(Header.Container_Header);
	logo = header.getByTestId(Buttons.Logo);
	industriesDropdownButton = header.getByTestId(Header.Industries);
	servicesDropdownButton = header.getByTestId(Header.Services);
	companyDropdownButton = header.getByTestId(Header.Company);
	pricingButton = header.getByTestId(Header.Pricing);
	buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton, pricingButton];
});

test(
	qase(5504, `Check buttons background color in the "Header" on the all pages @desktop @Regression @Header @TSWEB-656`),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of buttonHeaderslist) {
				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				if (
					url === UrlProvider.webSiteUrl() ||
					url === companyUrl[CompanyEnum.CaseStudies] ||
					url === UrlProvider.urlBuilder(UrlPath.CookiesPolicy)
				) {
					expect(actualColor).toBe(ColorsEnum.Grey_EFEFEF);
				} else {
					expect(actualColor).toBe(ColorsEnum.Grey_434343);
				}
			}
		}
	}
);

test(
	qase(
		5507,
		`Check buttons background color after hovering on it in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of buttonHeaderslist) {
				await button.hover();
				await driver.Page.waitForTimeout(1000); // Waiting for changing the color
				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				if (
					url === UrlProvider.webSiteUrl() ||
					url === companyUrl[CompanyEnum.CaseStudies] ||
					url === UrlProvider.urlBuilder(UrlPath.CookiesPolicy)
				) {
					expect(actualColor).toBe(ColorsEnum.Grey_Hover_D3D4D4);
				} else {
					expect(actualColor).toBe(ColorsEnum.Grey_Hover_2E3032);
				}
			}
		}
	}
);

test(
	qase(
		5505,
		`Check buttons background color after clicking on it in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

			for (const button of buttonHeaderslist) {
				await button.click();
				await logo.hover(); // To remove hover from button
				await driver.Page.waitForTimeout(1000); // Wait for changing color

				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				expect(actualColor).toBe(ColorsEnum.Yellow_FFC600);
			}
		}
	}
);

test(
	qase(
		5506,
		`Check buttons background color after clicking and hovering on it in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

			for (const button of buttonHeaderslist) {
				await button.click();
				await button.hover();
				await driver.Page.waitForTimeout(1000); // Wait for changing color

				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
			}
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
