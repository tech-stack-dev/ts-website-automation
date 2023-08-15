import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import Container from '../../../../../identifiers/Container';
import RenewableEnergy from '../../../../../identifiers/MainSite/pages/industries/RenewableEnergy';
import UrlPath from '../../../../../providers/UrlPath';
import UrlProvider from '../../../../../providers/UrlProvider';
import Links from '../../../../../preconditionsData/Links/Links';
import MainSiteButton from '../../../../../identifiers/MainSite/MainSiteButton';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.RenewableEnergy));
});

test("Check redirect by 'Home' breadcrumbs button in header from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const info = driver.getByTestId(RenewableEnergy.Info);
	await info.getByTestId(Container.BreadcrumbsPrev).click();

	await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
});

test("Check redirect by source link in 'Techstack in Numbers' container from the 'Renewable Energy' block @Regression @RenewableEnergy @TSWEB-957", async () => {
	const techstackInNumbersContainer = driver.getByTestId(RenewableEnergy.TechstackInNumbers);

	await techstackInNumbersContainer.getByTestId(MainSiteButton.DelloiteSurvey).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain(
		'https://www2.deloitte.com/content/dam/insights/us/articles/6387_100-Percent-Renewables/DI_100-Percent-Renewables.pdf'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
