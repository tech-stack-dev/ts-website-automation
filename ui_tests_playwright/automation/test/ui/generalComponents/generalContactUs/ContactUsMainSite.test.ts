import {test, expect, Locator} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Buttons from '../../../../identifiers/Buttons';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {serviceUrl, companyUrl, industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {ColorsEnum} from '../../../../enum/ColorsEnum';
import Header from '../../../../identifiers/mainSite/Header';
import {locatorUtils} from '../../../../utils/LocatorUtils';

let header: Locator;
let contactUsButton: Locator;

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	header = driver.getByTestId(Header.Container_Header);
	contactUsButton = header.getByTestId(Buttons.ContactUs);
});

const urlList: Array<string> = [
	UrlProvider.webSiteUrl(),
	companyUrl[CompanyEnum.AboutUs],
	companyUrl[CompanyEnum.HowWeWork],
	companyUrl[CompanyEnum.CaseStudies],
	companyUrl[CompanyEnum.Pricing],
	companyUrl[CompanyEnum.Whitepapers],
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.Terms),
	UrlProvider.urlBuilder(UrlPath.CookiesPolicy),
	UrlProvider.urlBuilder(UrlPath.Sitemap),
].concat(Object.values(industryUrl).concat(Object.values(serviceUrl)));

for (const url of urlList) {
	test(`Check "Contact Us" button color on the "${url}" page @Regression @ContactUs @TSWEB-532`, async () => {
		await baseDriverSteps.goToUrl(url);
		expect(await locatorUtils.checkBackgroundColor(contactUsButton, ColorsEnum.Yellow_FFC600)).toBeTruthy();
	});

	test(`Check "Contact Us" button color after hovering on the "${url}" page @Regression @ContactUs @TSWEB-532`, async () => {
		await baseDriverSteps.goToUrl(url);

		await contactUsButton.hover();
		// Wait for changing the color
		await driver.Page.waitForTimeout(1000);
		const actualColor = await contactUsButton.evaluate(async (el) => {
			return getComputedStyle(el).backgroundColor;
		});
		expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
	});

	test(`Check redirection by "Contact Us" button on the "${url}" page @Regression @ContactUs @TSWEB-532`, async () => {
		await baseDriverSteps.goToUrl(url);
		await contactUsButton.click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
