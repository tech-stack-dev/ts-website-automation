import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Containers from '../../../../identifiers/Career/Containers';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';
import {driver} from '../../../../base/driver/Driver';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import Navigation from '../../../../identifiers/Career/Navigation';
import Buttons from '../../../../identifiers/Buttons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header in career page @Regression @JobsBlock @TSWEB-146', async () => {
	const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, Containers.JobPageHeaderWrapper);
	const logoHeader = jobPageHeaderContainer.Element.getByTestId(Buttons.Logo);

	// A footer element is created to navigate to it and make the navigation bar appear.
	const footerContainer = await containerSteps.getContainer(ContainerByClass, Containers.FooterWrapper);
	const logoFooter = footerContainer.getByTestId(Buttons.Logo);
	await logoFooter.focus();

	await logoHeader.waitFor({state: 'visible'});
	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');

	await expect(jobPageHeaderContainer.Element.getByTestId(CareerButtons.EnLanguageSwitcher)).toHaveClass(
		/active-locale/
	);

	const uaButtonSwitcher = jobPageHeaderContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
