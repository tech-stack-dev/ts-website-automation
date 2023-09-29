import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {industryUrl} from '../../../../preconditionsData/UrlPreconditions';
import Container from '../../../../identifiers/Container';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test("Check redirects to 'Main' page by clicking 'Home' breadcrumbs button from 'Industries' pages @Regression @Breadcrumbs", async () => {
	for (const url of Object.values(industryUrl)) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Container.BreadcrumbsPrev).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	}
});

test("Check redirect to 'Main' page by clicking 'Home' breadcrumbs button from 'Our Services' page @Regression @Breadcrumbs", async () => {
	await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
	await driver.getByTestId(Container.BreadcrumbsPrev).click();
	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
});

test("Check redirects to 'Our Services' page by clicking 'Our Services' breadcrumbs button from 'Services' pages @Regression @Breadcrumbs", async () => {
	const servicesUrlList = [
		UrlProvider.urlBuilder(UrlPath.CustomDev),
		UrlProvider.urlBuilder(UrlPath.DigitalTransform),
		UrlProvider.urlBuilder(UrlPath.CloudDevelopment),
		UrlProvider.urlBuilder(UrlPath.MobileDev),
		UrlProvider.urlBuilder(UrlPath.BigData),
		UrlProvider.urlBuilder(UrlPath.InternetOfThings),
		UrlProvider.urlBuilder(UrlPath.DevOpsServ),
		UrlProvider.urlBuilder(UrlPath.AiDevelopment),
		UrlProvider.urlBuilder(UrlPath.UiUxDesign),
		UrlProvider.urlBuilder(UrlPath.QaAsAServ),
		UrlProvider.urlBuilder(UrlPath.ConsultingServ),
	];

	for (const url of servicesUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Container.BreadcrumbsPrev).click();
		await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
	}
});

test("Check redirects to 'Main' page by clicking 'Home' breadcrumbs button from 'Company' pages @Regression @Breadcrumbs", async () => {
	const companyUrlList = [UrlProvider.urlBuilder(UrlPath.AboutUs), UrlProvider.urlBuilder(UrlPath.HowWeWork)];

	for (const url of companyUrlList) {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Container.BreadcrumbsPrev).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
