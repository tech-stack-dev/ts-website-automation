import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import Container from '../../../identifiers/Container';
import CookiePolicy from '../../../identifiers/mainSite/pages/CookiePolicy';
import UrlPath from '../../../providers/UrlPath';
import Buttons from '../../../identifiers/Buttons';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.CookiesPolicy));
});

test(
	qase(5473, 'Check title from the "Cookie policy" page @desktop @mobile @Regression @CookiePolicy @TSWEB-1186'),
	async () => {
		const infoContainer = driver.getByTestId(CookiePolicy.Info);
		await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Cookie policy');
	}
);

test(
	qase(
		5475,
		'Check the container title and number from the "Cookie policy" page @desktop @mobile @Regression @CookiePolicy @TSWEB-1186'
	),
	async () => {
		const containers = [
			driver.getByTestId(CookiePolicy.GlossaryBasicConcepts),
			driver.getByTestId(CookiePolicy.WhosePersonalDataDoWeCollect),
			driver.getByTestId(CookiePolicy.WhenMayWeProcessYourPersonalData),
			driver.getByTestId(CookiePolicy.WhatPersonalDataDoWeCollect),
			driver.getByTestId(CookiePolicy.HowLongDoWeProcessYourData),
			driver.getByTestId(CookiePolicy.WhoHasAccessToYourPersonalData),
			driver.getByTestId(CookiePolicy.WhatAreCookieFiles),
			driver.getByTestId(CookiePolicy.TheCookiesWeUse),
			driver.getByTestId(CookiePolicy.HowToManageCookies),
			driver.getByTestId(CookiePolicy.ContactDetailsOfTechstack),
			driver.getByTestId(CookiePolicy.WhatAreYourRightsRegardingProcessing),
		];

		const expectedData = [
			['Glossary - Basic\nconcepts', '01'],
			['Whose personal data do we collect?', '02'],
			['When may we process your personal data?', '03'],
			['What personal data do we collect and what is the purpose and legal basis of such activities?', '04'],
			['How long do we process your data?', '05'],
			['Who has access to your personal data?', '06'],
			['What are “cookie” files and similar technologies? How and in what purpose do we use them?', '07'],
			['The cookies we use', '08'],
			['How to manage cookies', '09'],
			['Contact details of Techstack', '10'],
			['What are your rights regarding the processing of your personal data by Techstack?', '11'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test(
	qase(
		5474,
		'Check "Change consent" button from the "Cookie policy" page @desktop @mobile @Regression @CookiePolicy @TSWEB-1186'
	),
	async () => {
		const container = driver.getByTestId(CookiePolicy.HowToManageCookies);
		await container.getByTestId(Buttons.ChangeConsent).click({timeout: 5000});

		await expect(driver.getByTestId(Buttons.AcceptCookieSettings)).toBeVisible();
		await expect(driver.getByTestId(Buttons.Decline)).toBeVisible();
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
