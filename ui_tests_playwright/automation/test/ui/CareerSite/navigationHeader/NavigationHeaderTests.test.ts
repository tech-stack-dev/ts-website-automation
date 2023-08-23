import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../../providers/UrlProvider';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import ContainersCareer from '../../../../identifiers/Career/ContainersCareer';
import UrlPath from '../../../../providers/UrlPath';
import {driver} from '../../../../base/driver/Driver';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import Blog from '../../../../identifiers/Blog/Blog';
import CareerButtons from '../../../../identifiers/Career/CareerButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560', async () => {
	const headerContainer = await containerSteps.getContainer(ContainerByClass, ContainersCareer.NavigationHeaderClass);
	const uaButtonSwitcher = headerContainer.Element.getByTestId(CareerButtons.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test('Check that the "Stand with Ukraine" block with localization @Regression @StandWithUkraine @TSWEB-132', async () => {
	const SWUFrame = await containerSteps.getContainer(ContainerByClass, ContainersCareer.StandWithUkraineClass);
	await expect(SWUFrame.getByTestId(ContainersCareer.StandWithUkraineTitle)).toHaveText(
		'Techstack stands with Ukraine'
	);
	await expect(SWUFrame.getByTestId(CareerButtons.LearnMoreButton2)).toHaveText('Learn More');

	(await containerSteps.getContainer(ContainerByClass, ContainersCareer.NavigationHeaderClass)).Element.getByTestId(
		CareerButtons.UaLanguageSwitcher
	).click();

	await baseDriverSteps.checkUrl(`${UrlProvider.careerUrl()}uk-UA`);
	await expect(SWUFrame.getByTestId(ContainersCareer.StandWithUkraineTitle)).toHaveText(
		'Відповідь Techstack на війну в Україні'
	);
	await expect(SWUFrame.getByTestId(CareerButtons.LearnMoreButton2)).toHaveText('Ознайомитися');

	await SWUFrame.getByTestId(CareerButtons.LearnMoreButton2).click();

	const newPage = await driver.DriverContext.waitForEvent('page');
	await expect(newPage.url()).toContain(UrlProvider.urlBuilder(UrlPath.Blog_StandWithUkraine));
	await expect(newPage.getByTestId(Blog.Blog_StandWithUkraineTitile)).toContainText('Techstack Stands with Ukraine');
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
