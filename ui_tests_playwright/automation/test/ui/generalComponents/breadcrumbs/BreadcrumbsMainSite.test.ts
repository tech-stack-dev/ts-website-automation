import {test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {industryUrl, serviceUrl} from '../../../../preconditionsData/UrlPreconditions';
import Container from '../../../../identifiers/Container';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

test(
	qase(
		5483,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Industries" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		for (const url of Object.values(industryUrl)) {
			await baseDriverSteps.goToUrl(url);
			await driver.getByTestId(Container.BreadcrumbsPrev).click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5481,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Our Services" page @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		await baseDriverSteps.goToUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
		await driver.getByTestId(Container.BreadcrumbsPrev).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	}
);

test(
	qase(
		5484,
		'Check redirect to "Our Services" page by clicking "Our Services" breadcrumbs button from "Services" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		const servicesUrlListWithoutOurServicesPage = Object.values(serviceUrl).slice(1); // Because on "Our Services" page breadcrumbs to Home page

		for (const url of servicesUrlListWithoutOurServicesPage) {
			await baseDriverSteps.goToUrl(url);
			await driver.getByTestId(Container.BreadcrumbsPrev).click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
		}
	}
);

test(
	qase(
		5482,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Company" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		const companyUrlList = [UrlProvider.urlBuilder(UrlPath.AboutUs), UrlProvider.urlBuilder(UrlPath.HowWeWork)];

		for (const url of companyUrlList) {
			await baseDriverSteps.goToUrl(url);
			await driver.getByTestId(Container.BreadcrumbsPrev).click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
