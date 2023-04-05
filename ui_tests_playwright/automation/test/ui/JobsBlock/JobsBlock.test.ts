import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import {contentfulSteps} from '../../../steps/contentful/ContentfulSteps';
import {careerSteps} from '../../../steps/careerPageSteps/CareerSteps';
import {descriptionSteps} from '../../../steps/components/Job/DescriptionSteps';
import Career from '../../../identifiers/Career';
import {containerSteps} from '../../../steps/components/Container/ContainerSteps';
import ContainerByClass from '../../../components/Container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import JobPagePreconditions from '../../../preconditionsData/uiPreconditions/JobPagePreconditions';
import {sessionValue} from '../../../runtimeVariables/SessionValue';
import {jiraApiSteps} from '../../../steps/api/jira/JiraApiSteps';

test.beforeEach(async ({page}, testInfo) => {
	await jiraApiSteps.skipIfTestIsBlockedByJira(testInfo.title, test);
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
		Containers.jobPageApplyProposition
	);

	await expect((await driver.component(ContainerByClass, Career.jobHeaderTitle)).Element).toHaveText(
		'Тестова Вакансія'
	);
	await expect(driver.getByTestId(Career.jobHeaderJobsTabUa)).toHaveText('Вакансії');
	await expect(driver.getByTestId(Career.jobHeaderAboutUsTabUa)).toHaveText('Про компанію');
	await expect(driver.getByTestId(Career.jobHeaderReviewsTabUa)).toHaveText('Відгуки');
	await expect(driver.getByTestId(Career.jobHeaderContactUsTabUa)).toHaveText('Зв’язатись з нами');

	for (const header of JobPagePreconditions.descriptionBlocksIdentifiersAndUaHeaders) {
		await descriptionSteps.checkDescriptionBlockHeader(header[0], header[1]);
	}

	await expect(applyPropositionWrapper.Element).toHaveText('Хочеш стати частиною нашої команди?Подавай заявку!');
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`,
		false
	);
});
