import {Locator} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {industryUrl, serviceUrl, companyUrl} from '../../../../../preconditionsData/UrlPreconditions';
import UrlProvider from '../../../../../providers/UrlProvider';
import Buttons from '../../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {Environment} from '../../../../../providers/EnvProvider';
import {containerSteps, headerMenuSteps, test} from '../../../../../fixtures/DesktopMobileSetup';
import UrlUtils from '../../../../../utils/UrlUtils';
import UrlPath from '../../../../../providers/UrlPath';

let header: Locator;
let industriesButtons: object;
let servicesButtons: object;
let industriesUrls: string[];
let servicesUrls: string[];

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlUtils.getRandomUrlFromRecord(industryUrl),
	UrlUtils.getRandomUrlFromRecord(serviceUrl),
	UrlProvider.urlBuilder(UrlPath.AboutUs),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.Contacts),
	UrlProvider.urlBuilder(UrlPath.Terms),
];

// ToDo: add tests for checking functional related to articles that display in "Services" and "Company" dropdowns on Desktop menu
test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	header = await containerSteps.getDynamicLocator({
		desktopLocator: Header.Container_Header,
		mobileLocator: Header.ContainerMenu,
	});

	industriesButtons = Buttons.Industries;
	servicesButtons = Buttons.Services;

	industriesUrls = Object.values(industryUrl);
	servicesUrls = Object.values(serviceUrl);
});

test(
	qase(
		5500,
		`Check the redirection to the main page by clicking on the "Techstack" logo in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
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
		`Check the redirection for the Industries block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < industriesUrls.length; index++) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Industries).click();
				await header.getByTestId(Object.values(industriesButtons)[index]).click();
				await baseDriverSteps.checkUrl(industriesUrls[index]);
				await baseDriverSteps.goToUrl(url);
			}
		}
	}
);

test(
	qase(
		5503,
		`Check the redirection for the Services block in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (let index = 0; index < servicesUrls.length; index++) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Services).click();
				await header.getByTestId(Object.values(servicesButtons)[index]).click();
				await baseDriverSteps.checkUrl(servicesUrls[index]);
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
			[Buttons.Company.Career, UrlProvider.careerUrl(Environment.Production)],
			[Buttons.Company.CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			[Buttons.Company.Blog, companyUrl[CompanyEnum.Blog]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyList) {
				await headerMenuSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Company).click();
				await header.getByTestId(element).click();
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
		`Check the redirection to the "Get a quote" page by clicking on the "Contacts" button in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-1578`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			await header.getByTestId(Header.Contacts).click();
			await baseDriverSteps.checkUrl(companyUrl[CompanyEnum.Contacts]);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
