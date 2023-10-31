import {expect, test} from '@playwright/test';
import {driver} from '../../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../../base/step/BaseDriverSteps';
import ContainerByClass from '../../../../../../components/container/ContainerByClass';
import ContainersCareer from '../../../../../../identifiers/Careers/ContainersCareer';
import UrlProvider from '../../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../../../../steps/careerPageSteps/CareerSteps';
import {containerSteps} from '../../../../../../steps/components/container/ContainerSteps';
import {contentfulSteps} from '../../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../../utils/ContentfulUtils';
import {ColorsEnum} from '../../../../../../enum/ColorsEnum';
import {TagsEnum} from '../../../../../../enum/tag/TagsEnum';
import TagsCareer from '../../../../../../identifiers/Careers/TagsCareer';
import {SeniorityLevelsEnum} from '../../../../../../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../../../../../../enum/tag/DirectionsEnum';
import Career from '../../../../../../identifiers/Careers/pages/Career';
import {locatorUtils} from '../../../../../../utils/LocatorUtils';
import {playwrightUtils} from '../../../../../../utils/PlaywrightUtils';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

const testDataProvider = [
	{filterBlock: 'seniority level', createTag: [SeniorityLevelsEnum.Trainee], tagName: TagsCareer.TraineeTag},
	{
		filterBlock: 'direction',
		createTag: [DirectionsEnum.LongSoftwareDataManager],
		tagName: TagsCareer.LongSoftwareDataManager,
	},
	{filterBlock: 'technology stack', createTag: [TagsEnum.StackJava], tagName: TagsCareer.JavaTag},
	{filterBlock: 'tags', createTag: [TagsEnum.RemoteAllowed], tagName: TagsCareer.RemoteAllowedTag},
];

for (const testData of testDataProvider) {
	test(`Check that user sees vacancy by tags that were selected in ${testData.filterBlock} filter in side bar @Regression @FilterBlock @TSWEB-145`, async () => {
		contentfulUtils.AddTagsToCareerBody(testData.createTag);
		await contentfulSteps.createCareerWithDefaultValue(
			`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
			`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
		);
		await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

		const careerMainContainer = await containerSteps.getContainer(ContainerByClass, Career.CareerMainBody);
		const filterGroupContainer = await containerSteps.getContainer(
			ContainerByClass,
			ContainersCareer.FilterGroupWrapper,
			careerMainContainer
		);
		const filterTag = filterGroupContainer.getByTestId(testData.tagName);
		const activeTagsGroupContainer = await containerSteps.getContainer(
			ContainerByClass,
			ContainersCareer.ActiveTagsGroupWrapper,
			careerMainContainer
		);
		const activeTag = activeTagsGroupContainer.getByTestId(testData.tagName);

		await Promise.all([
			filterTag.click(),
			driver.executeFunc(async () => {
				await expect(filterTag).toHaveClass(/active-tag/);
				expect(await locatorUtils.checkBackgroundColor(filterTag, ColorsEnum.OrangeYellow)).toBeTruthy();
			}, 5),
			playwrightUtils.expectWithRetries(expect(activeTag).toHaveClass(/active-tag/), 5, 5000),
			playwrightUtils.expectWithRetries(
				expect(await activeTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
					ColorsEnum.OrangeYellow
				),
				5,
				5000
			),
		]);
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
