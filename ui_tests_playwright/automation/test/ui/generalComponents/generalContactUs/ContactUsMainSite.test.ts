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
import {qase} from 'playwright-qase-reporter/dist/playwright';

let header: Locator;
let contactUsButton: Locator;

test.beforeEach(async ({isMobile}) => {
	await baseDriverSteps.createsNewBrowser();
	header = isMobile ? driver.locator(Header.ContainerMenu) : driver.getByTestId(Header.Container_Header);
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

test(qase(5455, `Check "Contact Us" button color on all pages @desktop @mobile @Regression @ContactUs @TSWEB-532`), async () => {
	for (const url of urlList) {
		await baseDriverSteps.goToUrl(url);
		expect(await locatorUtils.checkBackgroundColor(contactUsButton, ColorsEnum.Yellow_FFC600)).toBeTruthy();
	}
});

test(
	qase(5456, `Check "Contact Us" button color after hovering on it on all pages @desktop @Regression @ContactUs @TSWEB-532`),
	async () => {
		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			await contactUsButton.hover();
			await driver.Page.waitForTimeout(1000); // Wait for changing the color
			const actualColor = await contactUsButton.evaluate(async (el) => {
				return getComputedStyle(el).backgroundColor;
			});
			expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
		}
	}
);

test(
	qase(5457, `Check redirection by "Contact Us" button on all pages @desktop @mobile @Regression @ContactUs @TSWEB-532`),
	async ({isMobile}) => {
		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			if (isMobile) await driver.getByTestId(Header.Menu).click();
			await contactUsButton.click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.ContactUs));
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
