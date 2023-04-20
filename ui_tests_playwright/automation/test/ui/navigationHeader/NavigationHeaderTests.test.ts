import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import ContainerByClass from '../../../components/container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import Button from '../../../identifiers/Button';
import UrlPath from '../../../providers/UrlPath';
import {Environment} from '../../../providers/EnvProvider';
import {driver} from '../../../base/driver/Driver';
import {containerSteps} from '../../../steps/components/container/ContainerSteps';
import Blog from '../../../identifiers/Blog';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560', async () => {
	const headerContainer = await containerSteps.getContainer(ContainerByClass, Containers.NavigationHeaderClass);
	const uaButtonSwitcher = headerContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test('Check the the "Stand with Ukraine" block with localization @Regression @StandWithUkraine @TSWEB-132', async () => {
	await expect(
		(
			await containerSteps.getContainer(ContainerByClass, Containers.StandWithUkraineClass)
		).Element
	).toBeVisible();
	await expect(driver.getByTestId(Containers.StandWithUkraineTitle)).toHaveText('Techstack stands with Ukraine');
	await expect(driver.getByTestId(Button.LearnMoreButton)).toHaveText('Learn More');

	const buttonSwitcher = (await containerSteps.getContainer(ContainerByClass, Containers.NavigationHeaderClass)).Element.getByTestId(Button.UaLanguageSwitcher);
	await buttonSwitcher.click();

	await baseDriverSteps.checkUrl(`${UrlProvider.careerUrl()}uk-UA`);
	await expect(driver.getByTestId(Containers.StandWithUkraineTitle)).toHaveText(
		'Відповідь Techstack на війну в Україні',
		{timeout: 1000}
	);
	await expect(driver.getByTestId(Button.LearnMoreButton)).toHaveText('Ознайомитися');

	await driver.getByTestId(Button.LearnMoreButton).click();
	await baseDriverSteps.checkUrl(UrlProvider.urlBuilder(UrlPath.Blog_StandWithUkraine, Environment.Production));
	await expect((await driver.getByTestId(Blog.Blog_StandWithUkraineTitile))).toContainText(
		'Techstack Stands with Ukraine'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
