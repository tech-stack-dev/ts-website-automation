import {Locator, expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {CompanyEnum} from '../../../../../enum/CompanyEnum';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Header from '../../../../../identifiers/mainSite/Header';
import {industryUrl, serviceUrl, companyUrl} from '../../../../../preconditionsData/UrlPreconditions';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

let header: Locator;

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.RenewableEnergy),
	UrlProvider.urlBuilder(UrlPath.AiDevelopment),
	// UrlProvider.urlBuilder(UrlPath.CaseStudies),
	UrlProvider.urlBuilder(UrlPath.Pricing),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.FrontEndDevelopment),
];

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	header = driver.getByTestId(Header.Container_Header);
});

for (const url of testDataProvider) {
	test(`Check the redirection to the main page by clicking on the "Techstack" logo in the "Header" on the "${url}" page @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await header.getByTestId(Header.Logo).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	});

	test(`Check the redirection for the Industries block in the "Header" on the "${url}" page @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		// const servicesList = new Map([
		// [Header.Industries_Healthcare, industryUrl[IndustriesEnum.Healthcare]],
		// 	[Header.Industries_TransportationAndLogistics, industryUrl[IndustriesEnum.TransportAndLogist]],
		// 	[Header.Industries_RenewableEnergy, industryUrl[IndustriesEnum.RenewableEnergy]],
		// ]);

		const links = driver.locator('//div[@id="header-industries-menu"]//a[@class="header-menu-link"]');
		const linksNumber = await links.count();
		const expectedUrls = Object.values(industryUrl);

		expect(linksNumber).toBe(expectedUrls.length);

		for (const link of await links.all()) {
			await driver.getByTestId(Header.Industries).click();
			await link.click();
			const currentUrl = driver.Page.url();
			// try {
			const foundLink = expectedUrls.find((url) => url === currentUrl);

			expect(foundLink).toBeTruthy();
			// } catch (error) {
			// console.error('The link not found in expected links array:', error.message);
			// }
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Services block in the "Header" on the "${url}" page @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const servicesList = new Map([
			[Header.Services_OurServices, serviceUrl[ServicesEnum.OurServices]],
			[Header.Services_CustomDev, serviceUrl[ServicesEnum.CustomDev]],
			[Header.Services_DigitalTransform, serviceUrl[ServicesEnum.DigitalTransform]],
			[Header.Services_CloudDev, serviceUrl[ServicesEnum.CloudDev]],
			[Header.Services_MobileDev, serviceUrl[ServicesEnum.MobileDev]],
			[Header.Services_BigData, serviceUrl[ServicesEnum.BigData]],
			[Header.Services_InternetOfThings, serviceUrl[ServicesEnum.InternetOfThings]],
			[Header.Services_DevOps, serviceUrl[ServicesEnum.DevOpsAsAServ]],
			[Header.Services_AiDevelopment, serviceUrl[ServicesEnum.AiDevelopment]],
			[Header.Services_UiUxDesign, serviceUrl[ServicesEnum.UiUxDesign]],
			[Header.Services_QaAsAServ, serviceUrl[ServicesEnum.QaAsAServ]],
			[Header.Services_ConsultingServ, serviceUrl[ServicesEnum.ConsultingServ]],
		]);

		for (const [element, serviceUrl] of servicesList) {
			await driver.getByTestId(Header.Services).click();
			await driver.getByTestId(element).click();
			await baseDriverSteps.checkUrl(serviceUrl);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Company block in the "Header" on the "${url}" page @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const companyList = new Map([
			[Header.Company_AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Header.Company_HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Header.Company_Career, companyUrl[CompanyEnum.Career]],
			[Header.Company_CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			[Header.Company_Blog, companyUrl[CompanyEnum.Blog]],
		]);

		for (const [element, companyUrl] of companyList) {
			await driver.getByTestId(Header.Company).click();
			await driver.getByTestId(element).click();
			await baseDriverSteps.checkUrl(companyUrl);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection to the "Pricing" page by clicking on the "Pricing" button in the "Header" on the "${url}" page @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await header.getByTestId(Header.Pricing).click();
		await baseDriverSteps.checkUrl(companyUrl[CompanyEnum.Pricing]);
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
