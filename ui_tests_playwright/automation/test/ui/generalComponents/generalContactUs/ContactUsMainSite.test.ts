import {Locator} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {serviceUrl, companyUrl, industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {ColorsEnum} from '../../../../enum/ColorsEnum';
import Header from '../../../../identifiers/mainSite/Header';
import {locatorUtils} from '../../../../utils/LocatorUtils';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {containerSteps, test, expect, headerMenuSteps} from '../../../../fixtures/DesktopMobileSetup';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';

let header: Locator;
let getAQuoteButton: Locator;

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();

	header = await containerSteps.getDynamicLocator({
		desktopLocator: Header.Container_Header,
		mobileLocator: Header.ContainerMenu,
	});
	getAQuoteButton = header.getByTestId(MainSiteButtons.GetAQuote).last(); 
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

test(
	qase(5455, `Check "Get a quote" button color on all pages @desktop @mobile @Regression @ContactUs @TSWEB-532`),
	async () => {
		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
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
		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			await getAQuoteButton.hover();
			await driver.Page.waitForTimeout(1000); // Wait for changing the color
			const actualColor = await getAQuoteButton.evaluate(async (el) => {
				return getComputedStyle(el).backgroundColor;
			});
			expect(actualColor).toBe(ColorsEnum.Yellow_Hover_EDAB00);
		}
	}
);

test.skip(
	qase(
		5457,
		`Check redirection by "Get a quote" button on all pages @desktop @mobile @Regression @ContactUs @TSWEB-532`
	),
	async () => {
		for (const url of urlList) {
			await baseDriverSteps.goToUrl(url);
			await headerMenuSteps.clickOnBurgerMenu();
			await getAQuoteButton.click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.GetAQuote));
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
