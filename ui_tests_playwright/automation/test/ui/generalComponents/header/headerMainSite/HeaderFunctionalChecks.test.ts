import {Locator} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {industryUrl, serviceUrl, companyUrl} from '../../../../../preconditionsData/UrlPreconditions';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import {IndustriesEnum} from '../../../../../enum/IndustriesEnum';
import Buttons from '../../../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import Links from '../../../../../preconditionsData/links/Links';
import {Environment} from '../../../../../providers/EnvProvider';
import {careerSteps, containerSteps, test} from '../../../../../fixtures/DesktopMobileSetup';
import ContainerByDataId from '../../../../../components/container/ContainerByDataId';

let header: Locator;

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
	UrlProvider.urlBuilder(UrlPath.AiDevelopment),
	UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
	UrlProvider.urlBuilder(UrlPath.Terms),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	const identifiers = await containerSteps.getContainer(ContainerByDataId, {
		desktopLocator: Header.Container_Header,
		mobileLocator: Header.ContainerMenu,
	});
	header = driver.getByTestId(identifiers.ComponentContext);
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
		const industriesList = new Map([
			[Buttons.Industries_Healthcare, industryUrl[IndustriesEnum.Healthcare]],
			[Buttons.Industries_TransportationAndLogistics, industryUrl[IndustriesEnum.TransportAndLogist]],
			[Buttons.Industries_RenewableEnergy, industryUrl[IndustriesEnum.RenewableEnergy]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, industryUrl] of industriesList) {
				await careerSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Industries).click();
				await header.getByTestId(element).click();
				await baseDriverSteps.checkUrl(industryUrl);
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
		const servicesList = new Map([
			[Buttons.Services_OurServices, serviceUrl[ServicesEnum.OurServices]],
			[Buttons.Services_CustomDev, serviceUrl[ServicesEnum.CustomDev]],
			[Buttons.Services_DigitalTransform, serviceUrl[ServicesEnum.DigitalTransform]],
			[Buttons.Services_CloudDev, serviceUrl[ServicesEnum.CloudDev]],
			[Buttons.Services_MobileDev, serviceUrl[ServicesEnum.MobileDev]],
			[Buttons.Services_BigData, serviceUrl[ServicesEnum.BigData]],
			[Buttons.Services_InternetOfThings, serviceUrl[ServicesEnum.InternetOfThings]],
			[Buttons.Services_DevOps, serviceUrl[ServicesEnum.DevOpsAsAServ]],
			[Buttons.Services_AiDevelopment, serviceUrl[ServicesEnum.AiDevelopment]],
			[Buttons.Services_UiUxDesign, serviceUrl[ServicesEnum.UiUxDesign]],
			[Buttons.Services_QaAsAServ, serviceUrl[ServicesEnum.QaAsAServ]],
			[Buttons.Services_ConsultingServ, serviceUrl[ServicesEnum.ConsultingServ]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, serviceUrl] of servicesList) {
				await careerSteps.clickOnBurgerMenu();

				await header.getByTestId(Header.Services).click();
				await header.getByTestId(element).click();
				await baseDriverSteps.checkUrl(serviceUrl);
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
			[Buttons.Company_AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Buttons.Company_HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Buttons.Company_Career, UrlProvider.careerUrl(Environment.Production)],
			[Buttons.Company_CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			// [Buttons.Company_Blog, companyUrl[CompanyEnum.Blog]], // Uncomment after Blog will be stable
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyList) {
				await careerSteps.clickOnBurgerMenu();

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

			await careerSteps.clickOnBurgerMenu();

			await header.getByTestId(Header.Pricing).click();
			await baseDriverSteps.checkUrl(companyUrl[CompanyEnum.Pricing]);
		}
	}
);

// Unskip after this button will be in header again
test.skip(
	qase(
		5555,
		`Check the redirection to the "IoT for Energy" page by clicking on the "IoT for Energy" button in the "Header" on all pages @desktop @mobile @Regression @Header @TSWEB-1267`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			await careerSteps.clickOnBurgerMenu();

			await header.getByTestId(Header.IotForEnergy).click();
			await baseDriverSteps.checkUrl(Links.IotForEnergy);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
