import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import Container from '../../../identifiers/Container';
import UrlPath from '../../../providers/UrlPath';
import Sitemap from '../../../identifiers/mainSite/pages/Sitemap';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Sitemap));
});

test('Check title from the "Sitemap" page @Regression @Sitemap @TSWEB-1186', async () => {
	const infoContainer = driver.getByTestId(Sitemap.Info);
	await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Sitemap');
});

test('Check the container title and number from the "Sitemap" page @Regression @Sitemap @TSWEB-1186', async () => {
	const containers = [
		driver.getByTestId(Sitemap.CompanyPages),
		driver.getByTestId(Sitemap.ServicesPages),
		driver.getByTestId(Sitemap.IndustryPages),
		driver.getByTestId(Sitemap.CaseStudiesPages),
		driver.getByTestId(Sitemap.ArticlesPages),
		driver.getByTestId(Sitemap.BlogPages),
	];

	const expectedData = [
		['Company pages', '01'],
		['Services pages', '02'],
		['Industry pages', '03'],
		['Case Studies\npages', '04'],
		['Articles pages', '05'],
		['Blog pages', '06'],
	];

	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
