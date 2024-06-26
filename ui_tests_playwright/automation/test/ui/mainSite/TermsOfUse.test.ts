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

test(
	qase(5478, 'Check title from the "Terms of use" page @desktop @mobile @Regression @TermsOfUse @TSWEB-1186'),
	async () => {
		const infoContainer = driver.getByTestId(TermsOfUse.Info);
		await expect(infoContainer.getByTestId(Container.Title)).toHaveText('Terms of use');
	}
);

test(
	qase(
		5479,
		'Check the container title and number from the "Terms of use" page @desktop @mobile @Regression @TermsOfUse @TSWEB-1186'
	),
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
			['1. Terms of use of the website', '02'],
			['2. The use of the Site', '03'],
			['3. Personal information of the User', '04'],
			['4. Limitation of liability', '05'],
			['5. Procedure of the Agreement', '06'],
			['6. Exclusive Rights', '07'],
		];

		await baseDriverSteps.checkContainerTitlesAndNumbers(containers, expectedData);
		await expect(
			driver.getByTestId(TermsOfUse.LimitationOfLiability).getByTestId(Container.ContainerSubTitle)
		).toHaveText('(of the Site Administration)');
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
