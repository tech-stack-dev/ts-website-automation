import { Locator, test } from '@playwright/test';
import { driver } from '../../../../base/driver/Driver';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import UrlPath from '../../../../providers/UrlPath';
import UrlProvider from '../../../../providers/UrlProvider';
import {
	companyUrl,
	expertiseUrlWithoutWebflow,
	industryUrl,
} from '../../../../preconditionsData/UrlPreconditions';
import Container from '../../../../identifiers/Container';
import { qase } from 'playwright-qase-reporter/dist/playwright';
import { CompanyEnum } from '../../../../enum/CompanyEnum';

let breadcrumbsHome: Locator;
let breadcrumbsPrev: Locator;

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
	breadcrumbsHome = driver.getByTestId(Container.BreadcrumbsHome);
	breadcrumbsPrev = driver.getByTestId(Container.BreadcrumbsPrev);
});

test(
	qase(
		5483,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Industries" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		for (const url of Object.values(industryUrl)) {
			await baseDriverSteps.goToUrl(url);
			await breadcrumbsHome.click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5483,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Expertise" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		for (const url of Object.values(expertiseUrlWithoutWebflow)) {
			await baseDriverSteps.goToUrl(url);
			await breadcrumbsHome.click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test(
	qase(
		5484,
		'Check redirect to "Our Services" page by clicking "Our Services" breadcrumbs button from "Expertise" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		for (const url of Object.values(expertiseUrlWithoutWebflow)) {
			await baseDriverSteps.goToUrl(url);
			await breadcrumbsPrev.click();
			await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.OurServices));
		}
	}
);

test(
	qase(
		5482,
		'Check redirect to main page by clicking "Home" breadcrumbs button from "Company" and "Our Services" pages @desktop @mobile @Regression @Breadcrumbs'
	),
	async () => {
		const companyUrlList = [
			companyUrl[CompanyEnum.AboutUs],
			companyUrl[CompanyEnum.HowWeWork],
			companyUrl[CompanyEnum.Pricing],
			UrlProvider.urlBuilder(UrlPath.OurServices),
		];

		for (const url of companyUrlList) {
			await baseDriverSteps.goToUrl(url);
			await breadcrumbsHome.click();
			await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
		}
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
