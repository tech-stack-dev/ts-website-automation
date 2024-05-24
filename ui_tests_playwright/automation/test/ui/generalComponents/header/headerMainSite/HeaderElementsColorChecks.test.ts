import {Locator} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {ColorsEnum} from '../../../../../enum/ColorsEnum';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {companyUrl, industryUrl, serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {buttonSteps, careerSteps, containerSteps, expect, test} from '../../../../../fixtures/DesktopMobileSetup';
import UrlUtils from '../../../../../utils/UrlUtils';
import Buttons from '../../../../../identifiers/Buttons';

let header: Locator;
let buttonHeaderslist: Locator[];
let industriesDropdownButton: Locator;
let servicesDropdownButton: Locator;
let companyDropdownButton: Locator;
let pricingButton: Locator;

let industriesButtons: object;
let servicesButtons: object;

const pagesWithWhiteHeader: string[] = [
	UrlProvider.webSiteUrl(),
	companyUrl[CompanyEnum.CaseStudies],
	companyUrl[CompanyEnum.Blog],
	UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
	UrlProvider.urlBuilder(UrlPath.Sitemap),
];
const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlUtils.getRandomUrlFromRecord(industryUrl),
	UrlUtils.getRandomUrlFromRecord(serviceUrl),
	UrlProvider.urlBuilder(UrlPath.AboutUs),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.Sitemap),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();

	header = await containerSteps.getDynamicLocator({
		desktopLocator: Header.Container_Header,
		mobileLocator: Header.ContainerMenu,
	});
	industriesDropdownButton = header.getByTestId(Header.Industries);
	servicesDropdownButton = header.getByTestId(Header.Services);
	companyDropdownButton = header.getByTestId(Header.Company);
	pricingButton = header.getByTestId(Header.Pricing);
	buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton, pricingButton];

	industriesButtons = Buttons.Industries;
	servicesButtons = Buttons.Services;
});

test(
	qase(
		5504,
		`Check buttons background color in the "Header" on the all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of buttonHeaderslist) {
				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				if (pagesWithWhiteHeader.includes(url)) {
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

				if (pagesWithWhiteHeader.includes(url)) {
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
		`Check buttons background color after clicking on it in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const buttonHeaderslist = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

			await careerSteps.clickOnBurgerMenu();

			for (const button of buttonHeaderslist) {
				await buttonSteps.buttonColorCheck(button, ColorsEnum.Yellow_FFC600);
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
// !!!!!!! for mobile
test(`Check the header information from the "Header" container on all pages @desktop @mobile @Regression @Header @TSWEB-656`, async () => {
	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);

		await careerSteps.clickOnBurgerMenu(); // !!!!
		await industriesDropdownButton.click(); // !!!
		const industriesText = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

		for (let index = 0; index < Object.values(industriesButtons).length; index++) {
			const button = header.getByTestId(Object.values(industriesButtons)[index]);
			await expect(button).toHaveText(industriesText[index]);
		}

		await expect(servicesDropdownButton).toHaveText('Services');
		const servicesText = [
			'Our Services',
			'Custom Software Development',
			'Digital Transformation',
			'Cloud Development',
			'Mobile Development',
			'Front-End Development',
			'Back-End Development',
			'Big Data & Analytics',
			'Internet of Things',
			'DevOps as a Service',
			'AI Development',
			'UX / UI Design',
			'QA as a Service',
			'Consulting Services',
		];

		for (let index = 0; index < Object.values(servicesButtons).length; index++) {
			const button = header.getByTestId(Object.values(servicesButtons)[index]);
			await expect(button).toHaveText(servicesText[index]);
		}

		await expect(companyDropdownButton).toHaveText('Company');
		const companyText = ['About Us', 'How we work', 'Career', 'Case Studies', 'Blog'];

		const companyButtons = [
			Buttons.Company.AboutUs,
			Buttons.Company.HowWeWork,
			Buttons.Company.Career,
			Buttons.Company.CaseStudies,
			Buttons.Company.Blog,
		];

		for (let index = 0; index < companyButtons.length; index++) {
			const button = header.getByTestId(Object.values(companyButtons)[index]);
			await expect(button).toHaveText(companyText[index]);
		}

		await expect(pricingButton).toHaveText('Pricing');
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
