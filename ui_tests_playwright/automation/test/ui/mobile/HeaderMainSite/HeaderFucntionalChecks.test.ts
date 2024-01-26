import { Locator, test } from '@playwright/test';
import { driver } from '../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import { CompanyEnum } from '../../../../enum/CompanyEnum';
import { ServicesEnum } from '../../../../enum/ServicesEnum';
import Header from '../../../../identifiers/mainSite/Header';
import { industryUrl, serviceUrl, companyUrl } from '../../../../preconditionsData/UrlPreconditions';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import { IndustriesEnum } from '../../../../enum/IndustriesEnum';
import Buttons from '../../../../identifiers/Buttons';
import { qase } from 'playwright-qase-reporter/dist/playwright';

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
	header = driver.locator(Header.ContainerMenu);
});

test(
	qase(
		5500,
		`Check the redirection to the main page by clicking on the "Techstack" logo in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			await header.getByTestId(Buttons.Logo).click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5501,
		`Check the redirection for the Industries block in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		// const industriesList = new Map([
		// 	['//a[@id="menu-link-healthcare-min"]', industryUrl[IndustriesEnum.Healthcare]],
		// 	['//a[@id="menu-link-logistics-min"]', industryUrl[IndustriesEnum.TransportAndLogist]],
		// 	['//a[@id="menu-link-energy-min"]', industryUrl[IndustriesEnum.RenewableEnergy]]

		// ])
		const industriesList = new Map([
			[Buttons.Industries_Healthcare, industryUrl[IndustriesEnum.Healthcare]],
			[Buttons.Industries_TransportationAndLogistics, industryUrl[IndustriesEnum.TransportAndLogist]],
			[Buttons.Industries_RenewableEnergy, industryUrl[IndustriesEnum.RenewableEnergy]],
		]);

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, industryUrl] of industriesList) {
				// await driver.getByTestId(Header.Industries).click();
				await driver.getByTestId(Header.Menu).click();

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
		`Check the redirection for the Services block in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		// const servicesList = new Map([
		// 	['//a[@id="menu-link-services-min"]', serviceUrl[ServicesEnum.OurServices]],
		// 	['//a[@id="menu-link-custom-min"]', serviceUrl[ServicesEnum.CustomDev]],
		// 	['//a[@id="menu-link-digital-min"]', serviceUrl[ServicesEnum.DigitalTransform]],
		// 	['//a[@id="menu-link-cloud-min"]', serviceUrl[ServicesEnum.CloudDev]],
		// 	['//a[@id="menu-link-mobile-min"]', serviceUrl[ServicesEnum.MobileDev]],
		// 	['//a[@id="menu-link-bigdata-min"]', serviceUrl[ServicesEnum.BigData]],
		// 	['//a[@id="menu-link-iot-min"]', serviceUrl[ServicesEnum.InternetOfThings]],
		// 	['//a[@id="menu-link-devops-min"]', serviceUrl[ServicesEnum.DevOpsAsAServ]],
		// 	['//a[@id="menu-link-aiml-min"]', serviceUrl[ServicesEnum.AiDevelopment]],
		// 	['//a[@id="menu-link-ui-min"]', serviceUrl[ServicesEnum.UiUxDesign]],
		// 	['//a[@id="menu-link-qa-min"]', serviceUrl[ServicesEnum.QaAsAServ]],
		// 	['//a[@id="menu-link-consulting-min"]', serviceUrl[ServicesEnum.ConsultingServ]],
		// ]);

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
				await driver.getByTestId(Header.Menu).click();

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
		`Check the redirection for the Company block in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		// const companyList = new Map([
		// 	['//a[@id="menu-link-company-min"]', companyUrl[CompanyEnum.AboutUs]],
		// 	['//a[@id="menu-link-cooperation-min"]', companyUrl[CompanyEnum.HowWeWork]],
		// 	['//a[@id="menu-link-career-min"]', companyUrl[CompanyEnum.Career]],
		// 	['//a[@id="menu-link-case-min"]', companyUrl[CompanyEnum.CaseStudies]],
		// 	// [Buttons.Company_Blog, companyUrl[CompanyEnum.Blog]], // Uncomment after Blog will be stable
		// ]);

		const companyList = new Map([
			[Buttons.Company_AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Buttons.Company_HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Buttons.Company_Career, companyUrl[CompanyEnum.Career]],
			[Buttons.Company_CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			// [Buttons.Company_Blog, companyUrl[CompanyEnum.Blog]], // Uncomment after Blog will be stable
		]);
	

		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);

			for (const [element, companyUrl] of companyList) {
				await driver.getByTestId(Header.Menu).click();

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
		`Check the redirection to the "Pricing" page by clicking on the "Pricing" button in the "Header" on all pages @mobile @Regression @Header @TSWEB-656`
	),
	async () => {
		for (const url of testDataProvider) {
			await baseDriverSteps.goToUrl(url);
			// await header.getByTestId(Header.Pricing).click();
			await driver.getByTestId(Header.Menu).click();

			await driver.locator('//a[@id="menu-link-pricing-min"]').click();
			await baseDriverSteps.checkUrl(companyUrl[CompanyEnum.Pricing]);
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
