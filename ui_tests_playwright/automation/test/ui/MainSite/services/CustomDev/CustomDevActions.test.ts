import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {CustomDev} from '../../../../../identifiers/MainSite/pages/services/CustomDev';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CustomDev));
});

test("Check redirect by 'Home' breadcrumbs button in header from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
});

test("Check page is scrolled down to 'Get in Touch' block after clicking on 'Request quote' from the 'Custom Software Development' block @Regression @CustomDev", async () => {
	const info = driver.getByTestId(CustomDev.Info);
	const requestAQuote = info.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check page is scrolled down to 'Get in Touch' block after clicking on 'Request quote' from the 'Technology stack' block @Regression @CustomDev", async () => {
	const technologyStack = driver.getByTestId(CustomDev.TechnologyStack);
	const requestAQuote = technologyStack.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test("Check carousel arrows and 'Request quote' button from the 'Custom software development process' block @Regression @CustomDev", async () => {
	const devProcess = driver.getByTestId(CustomDev.CustomSoftwareDevelopmentProcess);

	await baseDriverSteps.checkCarouselArrowsClick(devProcess);

	const requestAQuote = devProcess.getByTestId(MainSiteButtons.RequestAQuote);

	await expect(requestAQuote).toHaveText('Request a quote');

	await requestAQuote.click();
	await expect(driver.getByTestId(CustomDev.GetInTouch)).toBeInViewport();
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
