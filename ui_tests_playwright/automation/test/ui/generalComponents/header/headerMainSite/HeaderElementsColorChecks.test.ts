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
import {buttonSteps, containerSteps, expect, headerMenuSteps, test} from '../../../../../fixtures/DesktopMobileSetup';
import UrlUtils from '../../../../../utils/UrlUtils';
import Buttons from '../../../../../identifiers/Buttons';
import {locatorUtils} from '../../../../../utils/LocatorUtils';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';
import {playwrightUtils} from '../../../../../utils/PlaywrightUtils';

let header: Locator;
let headerButtonsList: Locator[];
let industriesDropdownButton: Locator;
let servicesDropdownButton: Locator;
let companyDropdownButton: Locator;
let pricingButton: Locator;
let contactsButton: Locator;
let getAQuoteButton: Locator;

const pagesWithWhiteHeader: string[] = [
	UrlProvider.webSiteUrl(),
	companyUrl[CompanyEnum.CaseStudies],
	companyUrl[CompanyEnum.Blog],
	UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
	UrlProvider.urlBuilder(UrlPath.Sitemap),
];
const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlUtils.getRandomUrlFromArray(Object.values(industryUrl)),
	UrlUtils.getRandomUrlFromArray(Object.values(serviceUrl)),
	UrlProvider.urlBuilder(UrlUtils.getRandomUrlFromArray([UrlPath.AboutUs, UrlPath.HowWeWork])),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(
		UrlUtils.getRandomUrlFromArray([UrlPath.Terms, UrlPath.CookiesPolicy, UrlPath.Sitemap, UrlPath.Whitepapers])
	),
];

// ToDo: add tests for checking functional related to articles that display in "Services" and "Company" dropdowns on Desktop menu
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
	contactsButton = header.getByTestId(Header.Contacts);
	headerButtonsList = [
		industriesDropdownButton,
		servicesDropdownButton,
		companyDropdownButton,
		pricingButton,
		contactsButton,
	];
	getAQuoteButton = header.getByTestId(MainSiteButtons.GetAQuote);
});

test.skip(
	qase(5504, `Check buttons background color in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of headerButtonsList) {
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

test.skip(
	qase(
		5507,
		`Check buttons background color after hovering on it in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of headerButtonsList) {
				await button.hover();

				await playwrightUtils.expectWithRetries(
					async () => {
						const actualColor = await button.evaluate(async (el) => {
							return getComputedStyle(el).backgroundColor;
						});

						if (pagesWithWhiteHeader.includes(url)) {
							expect(actualColor).toBe(ColorsEnum.Grey_Hover_D3D4D4);
						} else {
							expect(actualColor).toBe(ColorsEnum.Grey_Hover_2E3032);
						}
					},
					5,
					2000
				);
			}
		}
	}
);

test.skip(
	qase(
		5505,
		`Check buttons background color after clicking on it in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const headerButtonsList = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

			await headerMenuSteps.clickOnBurgerMenu();

			for (const button of headerButtonsList) {
				await buttonSteps.buttonColorCheck(button, ColorsEnum.Yellow_FFC600);
			}
		}
	}
);

test.skip(
	qase(
		5506,
		`Check buttons background color after clicking and hovering on it in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const headerButtonsList = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

			for (const button of headerButtonsList) {
				await button.click();
				await button.hover();

				await playwrightUtils.expectWithRetries(
					async () => {
						const actualColor = await button.evaluate(async (el) => {
							return getComputedStyle(el).backgroundColor;
						});
						expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
					},
					5,
					2000
				);
			}
		}
	}
);

test.skip(`Check the header information from the "Header" container on all pages @desktop @mobile @Regression @Header @TSWEB-656`, async () => {
	for (const url of testDataProvider) {
		headerButtonsList = [industriesDropdownButton, servicesDropdownButton, companyDropdownButton];

		await baseDriverSteps.goToUrl(url);
		await headerMenuSteps.clickOnBurgerMenu();
		const headerButtonsText = ['Industries', 'Services', 'Company'];

		for (let index = 0; index < headerButtonsList.length; index++) {
			await headerButtonsList[index].click();
			await headerMenuSteps.checkDropdownButtonText(headerButtonsList[index], headerButtonsText[index]);
		}

		const industriesButtons = Buttons.Industries;
		const industriesText = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

		for (let index = 0; index < Object.values(industriesButtons).length; index++) {
			const button = header.getByTestId(Object.values(industriesButtons)[index]);
			await expect(button).toHaveText(industriesText[index]);
		}

		const servicesButtons = Buttons.Services;
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
		await expect(contactsButton).toHaveText('Contacts');

		await expect(getAQuoteButton).toHaveText('Get a quote');
	}
});

test(
	qase(5455, `Check "Get a quote" button color on all pages @desktop @mobile @Regression @ContactUs @TSWEB-532`),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			expect(await locatorUtils.checkBackgroundColor(getAQuoteButton, ColorsEnum.Yellow_FFC600)).toBeTruthy();
		}
	}
);

test(
	qase(
		5456,
		`Check "Get a quote" button color after hovering on it on all pages @desktop @Regression @ContactUs @TSWEB-532`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await getAQuoteButton.hover();

			await playwrightUtils.expectWithRetries(
				async () => {
					const actualColor = await getAQuoteButton.evaluate(async (el) => {
						return getComputedStyle(el).backgroundColor;
					});
					expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
				},
				3,
				2000
			);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
