import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import ContainersCareer from '../../../../identifiers/career/ContainersCareer';
import {driver} from '../../../../base/driver/Driver';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import CareerButtons from '../../../../identifiers/career/CareerButtons';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test(
	qase(4868, 'Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560'),
	async () => {
		const headerContainer = await containerSteps.getContainer(
			ContainerByClass,
			ContainersCareer.NavigationHeaderClass
		);
		const uaButtonSwitcher = headerContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
		await uaButtonSwitcher.click();
		await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
	}
);

test.afterEach(async () => {
	await driver.closeDrivers();
});
