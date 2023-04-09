import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import {containerSteps} from '../../../steps/components/Container/ContainerSteps';
import UrlProvider from '../../../providers/UrlProvider';
import ContainerByClass from '../../../components/Container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import Button from '../../../identifiers/Button';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560', async () => {
	const headerContainer = await containerSteps.getContainer(ContainerByClass, Containers.navigationHeaderClass);
	const uaButtonSwitcher = headerContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test('Check the the "Stand with Ukraine" block with localization @Regression @StandWithUkraine @TSWEB-132', async () => {
	const buttonSwitcher = await (
		await containerSteps.getContainer(ContainerByClass, Containers.navigationHeaderClass)
	).Element.getByTestId(Button.UaLanguageSwitcher);
	expect((await containerSteps.getContainer(ContainerByClass, Containers.standWithUkraineClass)).Element).toHaveText(
		'Techstack stands with Ukraine'
	);
	expect(await driver.getByTestId('LearnMoreButton-SharedLearnMore2')).toHaveText('Learn More');

	await buttonSwitcher.click();
	expect((await containerSteps.getContainer(ContainerByClass, Containers.standWithUkraineClass)).Element).toHaveText(
		'Відповідь Techstack на війну в Україні',
		{timeout: 1000}
	);
	expect(await driver.getByTestId('LearnMoreButton-SharedLearnMore2')).toHaveText('Ознайомитися');

	await driver.getByTestId('LearnMoreButton-SharedLearnMore2').click();
	await baseDriverSteps.checkUrl('https://tech-stack.com/blog/techstack-stands-with-ukraine/');
	expect((await containerSteps.getContainer(ContainerByClass, Containers.postTitileClass)).Element).toHaveText(
		'Techstack Stands with Ukraine'
	);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
