import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import Container from '../../../identifiers/Container';
import UrlPath from '../../../providers/UrlPath';
import TermsOfUse from '../../../identifiers/mainSite/pages/TermsOfUse';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.urlBuilder(UrlPath.Terms));
});

test(qase(5478, 'Check title from the "Terms of use" page @desktop @mobile @Regression @TermsOfUse @TSWEB-1186'), async () => {
	const infoContainer = driver.getByTestId(TermsOfUse.Info);
	await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Terms of use');
});

test(
	qase(5479, 'Check the container title and number from the "Terms of use" page @desktop @mobile @Regression @TermsOfUse @TSWEB-1186'),
	async () => {
		const containers = [
			driver.getByTestId(TermsOfUse.TermsOfUseOfTheWebsite),
			driver.getByTestId(TermsOfUse.TheUseOfTheSite),
			driver.getByTestId(TermsOfUse.PersonalInformationOfTheUser),
			driver.getByTestId(TermsOfUse.LimitationOfLiability),
			driver.getByTestId(TermsOfUse.ProcedureOfTheAgreement),
			driver.getByTestId(TermsOfUse.ExclusiveRights),
		];

		const expectedData = [
			['1. Terms of use\n of the website', '02'],
			['2. The use of \nthe Site', '03'],
			['3. Personal information \nof the User', '04'],
			['4. Limitation\nof liability(of the Site Administration)', '05'],
			['5. Procedure of the Agreement', '06'],
			['6. Exclusive \nRights', '07'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
