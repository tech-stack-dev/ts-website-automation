import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import {sessionValue} from '../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../steps/careerPageSteps/CareerSteps';
import {contentfulSteps} from '../../../steps/contentful/ContentfulSteps';
import Containers from '../../../identifiers/Containers';
import Career from '../../../identifiers/Career';
import {driver} from '../../../base/driver/Driver';
import JobPagePreconditions from '../../../preconditionsData/JobPagePreconditions';
import Link from '../../../identifiers/Link';
import Button from '../../../identifiers/Button';
import {descriptionSteps} from '../../../steps/components/job/DescriptionSteps';
import {containerSteps} from '../../../steps/components/container/ContainerSteps';
import ContainerByClass from '../../../components/container/ContainerByClass';
import Navigation from '../../../identifiers/Navigation';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test('Check that breadcrumbs displays correctly on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	expect(await careerSteps.getBreadcrumbsText()).toBe(
		`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test('Check localization on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.switchLanguageViaHeader('ua');
	const applyPropositionWrapper = await containerSteps.getContainer(
		ContainerByClass,
		Containers.JobPageApplyProposition
	);

	await expect((await driver.component(ContainerByClass, Career.JobHeaderTitle)).Element).toHaveText(
		'Тестова Вакансія'
	);
	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Вакансії');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('Про компанію');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Відгуки');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Зв’язатись з нами');

	for (const header of JobPagePreconditions.descriptionBlocksIdentifiersAndUaHeaders) {
		await descriptionSteps.checkDescriptionBlockHeader(header[0], header[1]);
	}

	await expect(applyPropositionWrapper.Element).toHaveText('Хочеш стати частиною нашої команди?Подавай заявку!');
});

test('Check that user can switch language in navigation header in job page @Regression @JobsBlock @TSWEB-146', async () => {
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	await careerSteps.clickOnCareerCard(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
	const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, Containers.JobPageHeaderWrapper);

	expect(await careerSteps.getBreadcrumbsText()).toBe(
		`Jobs / JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
	);

	const logo = jobPageHeaderContainer.Element.getByTestId(Link.Logo);
	await logo.waitFor({state: 'visible'});

	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');
	await expect(jobPageHeaderContainer.Element.getByTestId(Button.EnLanguageSwitcher)).toHaveClass(/active-locale/);

	const uaButtonSwitcher = jobPageHeaderContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
