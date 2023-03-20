import {test} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import {baseDriverSteps} from '../../base/step/BaseDriverSteps';
import Button from '../../identifiers/Button';
import UrlPath from '../../providers/UrlPath';
import UrlProvider from '../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @Regression @ContactUs @TSWEB-532", async () => {
	let urlList: Array<string> = [
		UrlProvider.urlBuilder(UrlPath.OurServices),
		UrlProvider.urlBuilder(UrlPath.CustomDev),
		UrlProvider.urlBuilder(UrlPath.CloudAndDev),
		UrlProvider.urlBuilder(UrlPath.BigData),
		UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		UrlProvider.urlBuilder(UrlPath.MobileDev),
		UrlProvider.urlBuilder(UrlPath.UiUxDesign),
		UrlProvider.urlBuilder(UrlPath.QaAsAServ),
		UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	];

	for (let url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test("Check 'Contact Us' button from 'Company' section @Regression @ContactUs @TSWEB-532", async () => {
	let urlList: Array<string> = [
		UrlProvider.urlBuilder(UrlPath.AboutUs),
		UrlProvider.urlBuilder(UrlPath.HowWeWork),
		UrlProvider.urlBuilder(UrlPath.CaseStudies),
		UrlProvider.urlBuilder(UrlPath.Blog),
	];

	for (let url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @Regression @ContactUs @TSWEB-532", async () => {
	let urlList: Array<string> = [
		UrlProvider.urlBuilder(UrlPath.ContactUs),
		UrlProvider.webSiteUrl(),
	];

	for (let url of urlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Button.ContactUs).click();
		await baseDriverSteps.checkUrl(
			UrlProvider.urlBuilder(UrlPath.ContactUs)
		);
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
