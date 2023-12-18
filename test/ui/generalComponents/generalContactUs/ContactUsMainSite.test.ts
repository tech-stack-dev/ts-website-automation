import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {serviceUrl, companyUrl, industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test('Check "Contact Us" button from "Main", "Contact Us", and "Pricing" pages @Regression @ContactUs @TSWEB-532', async () => {
	const urlList: Array<string> = [
		UrlProvider.webSiteUrl(),
		UrlProvider.urlBuilder(UrlPath.ContactUs),
		UrlProvider.urlBuilder(UrlPath.Pricing),
	];

	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test('Check "Contact Us" button from "Industries" pages @Regression @ContactUs', async () => {
	for (const url of Object.values(industryUrl)) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test('Check "Contact Us" button from "Services" pages @Regression @ContactUs @TSWEB-532', async () => {
	for (const url of Object.values(serviceUrl)) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test('Check "Contact Us" button from "Company" pages @Regression @ContactUs @TSWEB-532', async () => {
	const urlList: string[] = [
		companyUrl[CompanyEnum.AboutUs],
		companyUrl[CompanyEnum.HowWeWork],
		companyUrl[CompanyEnum.Pricing],
		companyUrl[CompanyEnum.CaseStudies],
		companyUrl[CompanyEnum.Whitepapers],
	];
	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test('Check "Contact Us" button from "Terms of use", "Cookie Policy", and "Sitemap" pages @Regression @ContactUs @TSWEB-532', async () => {
	const urlList: string[] = [
		UrlProvider.urlBuilder(UrlPath.Terms),
		UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
		UrlProvider.urlBuilder(UrlPath.Sitemap),
	];
	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
