import {Locator} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {ColorsEnum} from '../../../../../enum/ColorsEnum';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {companyUrl, industryUrl, expertiseUrl, serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
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
let servicesMenu: Locator;
let industriesMenu: Locator;
let expertiseMenu: Locator;
let companyMenu: Locator;
let headerButtonsList: Locator[];
let industriesDropdownButton: Locator;
let servicesDropdownButton: Locator;
let expertiseDropdownButton: Locator;
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
	UrlUtils.getRandomUrlFromArray(Object.values(serviceUrl)),
	UrlUtils.getRandomUrlFromArray(Object.values(industryUrl)),
	UrlUtils.getRandomUrlFromArray(Object.values(expertiseUrl)),
	UrlProvider.urlBuilder(UrlUtils.getRandomUrlFromArray([UrlPath.AboutUs, UrlPath.HowWeWork, UrlPath.OurClients])),
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
	expertiseDropdownButton = header.getByTestId(Header.Expertise);
	companyDropdownButton = header.getByTestId(Header.Company);
	pricingButton = header.getByTestId(Header.Pricing);
	contactsButton = header.getByTestId(Header.Contacts);
	headerButtonsList = [
		industriesDropdownButton,
		servicesDropdownButton,
		expertiseDropdownButton,
		companyDropdownButton,
		pricingButton,
		contactsButton,
	];
	getAQuoteButton = header.getByTestId(MainSiteButtons.GetAQuote);

	servicesMenu = await containerSteps.getDynamicLocator({
		desktopLocator: Header.ServicesMenu,
		mobileLocator: Header.ServicesDropdown,
	});
	industriesMenu = await containerSteps.getDynamicLocator({
		desktopLocator: Header.IndustriesMenu,
		mobileLocator: Header.IndustriesDropdown,
	});
	expertiseMenu = await containerSteps.getDynamicLocator({
		desktopLocator: Header.ExpertiseMenu,
		mobileLocator: Header.ExpertiseDropdown,
	});
	companyMenu = await containerSteps.getDynamicLocator({
		desktopLocator: Header.CompanyMenu,
		mobileLocator: Header.CompanyDropdown,
	});
});

test(
	qase(5504, `Check buttons background color in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const button of headerButtonsList) {
				const actualColor = await button.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				});

				expect(actualColor).toBe(ColorsEnum.Transparent);
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

			for (const button of headerButtonsList) {
				await button.hover();

				await playwrightUtils.expectWithRetries(
					async () => {
						const actualColor = await button.evaluate(async (el) => {
							return getComputedStyle(el).backgroundColor;
						});

						if (pagesWithWhiteHeader.includes(url)) {
							expect(actualColor).toBe(ColorsEnum.Grey_EFEFEF);
						} else {
							expect(actualColor).toBe(ColorsEnum.Grey_434343);
						}
					},
					5,
					2000
				);
			}
		}
	}
);

test(
	// FIX !!!
	qase(
		5505,
		`Check buttons background color after clicking on it in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			const headerButtonsList = [
				industriesDropdownButton,
				servicesDropdownButton,
				expertiseDropdownButton,
				companyDropdownButton,
			];

			await headerMenuSteps.clickOnBurgerMenu();

			for (const button of headerButtonsList) {
				await buttonSteps.buttonColorCheck(button, ColorsEnum.Yellow_FFC600);
			}
		}
	}
);

test(`Check Services titles in the "Header" on all pages @desktop @Regression @Header @TSWEB-656`, async () => {
	for (const url of testDataProvider) {
		await baseDriverSteps.goToUrl(url);
		await servicesDropdownButton.click();

		const servicesTitles = [Header.Engineering, Header.Optimisation, Header.Staffing];
		const servicesTitlesText = ['Engineering', 'Optimisation', 'Staffing'];

		for (let index = 0; index < servicesTitles.length; index++) {
			const button = servicesMenu.getByTestId(servicesTitles[index]);
			await expect(button).toHaveText(servicesTitlesText[index]);
		}
	}
});

test(`Check the header information from the "Header" container on all pages @desktop @mobile @Regression @Header @TSWEB-656`, async () => {
	for (const url of testDataProvider) {
		headerButtonsList = [
			servicesDropdownButton,
			industriesDropdownButton,
			expertiseDropdownButton,
			companyDropdownButton,
		];

		await baseDriverSteps.goToUrl(url);
		await headerMenuSteps.clickOnBurgerMenu();
		const headerButtonsText = ['Services', 'Industries', 'Expertise', 'Company'];

		for (let index = 0; index < headerButtonsList.length; index++) {
			await headerButtonsList[index].click();
			await headerMenuSteps.checkDropdownButtonText(headerButtonsList[index], headerButtonsText[index]);
		}

		const servicesButtons = Buttons.Services;
		const servicesText = [
			'PoC / MVP Development',
			'Custom Software Development',
			'AI Integration Services',
			'Data Strategy',
			'Software Audit',
			'QA as a Service',
			'Product Scaling',
			'Cloud Migration',
			'Dedicated Team',
			'Staff Augmentation',
		];

		for (let index = 0; index < Object.values(servicesButtons).length; index++) {
			const button = servicesMenu.getByTestId(Object.values(servicesButtons)[index]);
			await expect(button).toHaveText(servicesText[index]);
		}

		const industriesButtons = Buttons.Industries;
		const industriesText = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

		for (let index = 0; index < Object.values(industriesButtons).length; index++) {
			const button = industriesMenu.getByTestId(Object.values(industriesButtons)[index]);
			await expect(button).toHaveText(industriesText[index]);
		}

		const expertiseButtons = Buttons.Expertise;
		const expertiseText = [
			'Cloud Development',
			'DevOps as a Service',
			'Internet of Things',
			'Digital Transformation',
			'UX / UI Design',
			'Mobile Development',
			'Front-End Development',
			'Back-End Development',
			'Big Data & Analytics',
			'AI Development',
			'Computer Vision',
			'OpenAI API Integration',
			'Deep Learning',
		];

		for (let index = 0; index < Object.values(expertiseButtons).length; index++) {
			const button = expertiseMenu.getByTestId(Object.values(expertiseButtons)[index]);
			await expect(button).toHaveText(expertiseText[index]);
		}

		const companyText = ['About Us', 'How we work', 'Our Clients', 'Career', 'Case Studies', 'Blog'];
		const companyButtons = [
			Buttons.Company.AboutUs,
			Buttons.Company.HowWeWork,
			Buttons.Company.OurClients,
			Buttons.Company.Career,
			Buttons.Company.CaseStudies,
			Buttons.Company.Blog,
		];

		for (let index = 0; index < companyButtons.length; index++) {
			const button = companyMenu.getByTestId(Object.values(companyButtons)[index]);
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
