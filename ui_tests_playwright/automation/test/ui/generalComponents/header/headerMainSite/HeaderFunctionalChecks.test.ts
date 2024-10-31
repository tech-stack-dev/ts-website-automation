import {Locator} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {
	industryUrl,
	expertiseUrl,
	companyUrl,
	urlsWithOnlyLogoInHeader,
	serviceUrl,
	webflowPages,
} from '../../../../../preconditionsData/UrlPreconditions';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {Environment} from '../../../../../providers/EnvProvider';
import {containerSteps, headerMenuSteps, test} from '../../../../../fixtures/DesktopMobileSetup';
import UrlUtils from '../../../../../utils/UrlUtils';
import UrlPath from '../../../../../providers/UrlPath';
import MainSiteButtons from '../../../../../identifiers/mainSite/MainSiteButtons';

let header: Locator;
let servicesMenu: Locator;
let industriesMenu: Locator;
let expertiseMenu: Locator;
let companyMenu: Locator;
let servicesButtons: object;
let industriesButtons: object;
let expertiseButtons: object;
let servicesUrls: string[];
let industriesUrls: string[];
let expertiseUrls: string[];

let testDataProvider: string[] = [
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
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
	header = await containerSteps.getDynamicLocator({
		desktopLocator: Header.Container_Header,
		mobileLocator: Header.ContainerMenu,
	});

	servicesButtons = Buttons.Services;
	industriesButtons = Buttons.Industries;
	expertiseButtons = Buttons.Expertise;

	servicesUrls = Object.values(serviceUrl);
	industriesUrls = Object.values(industryUrl);
	expertiseUrls = Object.values(expertiseUrl);

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
	qase(
		5500,
		`Check the redirection to the main page by clicking on the "Techstack" logo in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		testDataProvider = testDataProvider.concat(urlsWithOnlyLogoInHeader);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await driver.getByTestId(Buttons.Logo).click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5501,
		`Check the redirection for the Services block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < servicesUrls.length; index++) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Services).click();
				await servicesMenu.getByTestId(Object.values(servicesButtons)[index]).click();
				await baseDriverSteps.checkUrl(servicesUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5501,
		`Check the redirection for the Industries block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < industriesUrls.length; index++) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Industries).click();
				await industriesMenu.getByTestId(Object.values(industriesButtons)[index]).click();
				await baseDriverSteps.checkUrl(industriesUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5503,
		`Check the redirection for the Expertise block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < expertiseUrls.length; index++) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Expertise).click();
				await expertiseMenu.getByTestId(Object.values(expertiseButtons)[index]).click();
				await baseDriverSteps.checkUrl(expertiseUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5502,
		`Check the redirection for the Company block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		const companyList = new Map([
			[Buttons.Company.AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Buttons.Company.HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Buttons.Company.OurClients, companyUrl[CompanyEnum.OurClients]],
			[Buttons.Company.Career, UrlProvider.careerUrl(Environment.Production)],
			[Buttons.Company.CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			[Buttons.Company.Blog, companyUrl[CompanyEnum.Blog]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyList) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Company).click();
				await companyMenu.getByTestId(element).click();
				await baseDriverSteps.checkUrl(companyUrl);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5499,
		`Check the redirection to the "Pricing" page by clicking on the "Pricing" button in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			await header.getByTestId(Header.Pricing).click();
			await baseDriverSteps.checkUrl(companyUrl[CompanyEnum.Pricing]);
		}
	}
);

test(
	qase(
		5583,
		`Check the redirection to the "Contact us" page by clicking on the "Contacts" button in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-1578`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			await header.getByTestId(Header.Contacts).click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
		}
	}
);

test(
	qase(
		5457,
		`Check the redirection to the "Book a strategy call" page by clicking on the "Book a strategy call" button on all pages @desktop @mobile @Regression @BookAStrategyCall @TSWEB-532`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			await header.getByTestId(MainSiteButtons.GetAQuote).click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.BookAStrategyCall));
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
