import {expect, test} from '@playwright/test';
import AboutUs from '../../../../identifiers/mainSite/pages/company/AboutUs';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';
import UrlPath from '../../../../providers/UrlPath';
import MainSiteButtons from '../../../../identifiers/mainSite/MainSiteButtons';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.AboutUs));
});

test(qase(4787, 'Check the Info container from the "About Us" page @Regression @AboutUs @TSWEB-1022'), async () => {
	const info = driver.getByTestId(AboutUs.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Home\nAbout Us');
	await expect(info.getByTestId(Container.Title)).toHaveText('We Make an Impact on\nthe Product, People, and\nWorld');
	await expect(info.getByTestId(MainSiteButtons.LetsMakeItTogether)).toHaveText('Let’s make it together');
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
