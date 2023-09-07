import {expect, test} from '@playwright/test';
import AboutUs from '../../../../identifiers/MainSite/pages/company/AboutUs';
import { baseDriverSteps } from '../../../../base/step/BaseDriverSteps';
import { driver } from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import Container from '../../../../identifiers/Container';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test("Check the header from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const info = driver.getByTestId(AboutUs.info);
	await expect(info.getByTestId(Container.Title)).toHaveText('We Make an Impact on\nthe Product, People, and\nWorld');
});

test("Check the container title and number from the 'About Us' page @Regression @AboutUs @TSWEB-1022", async () => {
	const containers = [
		driver.getByTestId(AboutUs.ourStory),
		driver.getByTestId(AboutUs.whatsAtTheCore),
		driver.getByTestId(AboutUs.ourTeam),
		driver.getByTestId(AboutUs.whatMakesUsSpecial),
		driver.getByTestId(AboutUs.ourPartners),
		driver.getByTestId(AboutUs.shoutoutFromOurPartners),
		driver.getByTestId(AboutUs.ourPeople),
		driver.getByTestId(AboutUs.getInTouch),
	];

	const expectedData = [
		['Our story', '01'],
		['What’s at the Core', '02'],
		['Our team', '03'],
		['What makes\nus special', '04'],
		['Our partners', '05'],
		['Shoutout from\nour partners', '06'],
		['Our people', '07'],
		['Get in Touch', '08'],
	];
	
	await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
});