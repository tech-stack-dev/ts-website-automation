import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {serviceUrl, companyUrl, industriesUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Industries' section @Regression @ContactUs", async () => {
	for (const url of Object.values(industriesUrl)) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test("Check 'Contact Us' button from 'Services' section @Regression @ContactUs @TSWEB-532", async () => {
	for (const url of Object.values(serviceUrl)) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test("Check 'Contact Us' button from 'Company' section @Regression @ContactUs @TSWEB-532", async () => {
	const urlList: string[] = [
		companyUrl[CompanyEnum.AboutUs],
		companyUrl[CompanyEnum.HowWeWork],
		companyUrl[CompanyEnum.CaseStudies],
		companyUrl[CompanyEnum.Blog],
	];
	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @Regression @ContactUs @TSWEB-532", async () => {
	const urlList: Array<string> = [UrlProvider.urlBuilder(UrlPath.ContactUs), UrlProvider.webSiteUrl()];

	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.ContactUs).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
