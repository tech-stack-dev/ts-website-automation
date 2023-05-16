import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import ContainerByClass from '../../../../../components/container/ContainerByClass';
import Containers from '../../../../../identifiers/Containers';
import UrlProvider from '../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../runtimeVariables/SessionValue';
import {careerSteps} from '../../../../../steps/careerPageSteps/CareerSteps';
import {containerSteps} from '../../../../../steps/components/container/ContainerSteps';
import {contentfulSteps} from '../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../utils/ContentfulUtils';
import {ColorsEnum} from '../../../../../enum/ColorsEnum';
import {TagsEnum} from '../../../../../enum/tag/TagsEnum';
import Tag from '../../../../../identifiers/Tag';
import {SeniorityLevelsEnum} from '../../../../../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../../../../../enum/tag/DirectionsEnum';
import Career from '../../../../../identifiers/Career';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

const testDataProvider = [
	{filterBlock: 'seniority level', createTag: [SeniorityLevelsEnum.Trainee], tagName: Tag.TraineeTag},
	{
		filterBlock: 'direction',
		createTag: [DirectionsEnum.LongSoftwareDataManager],
		tagName: Tag.LongSoftwareDataManager,
	},
	{filterBlock: 'technology stack', createTag: [TagsEnum.StackJava], tagName: Tag.JavaTag},
	{filterBlock: 'tags', createTag: [TagsEnum.RemoteAllowed], tagName: Tag.RemoteAllowedTag},
];

for (const testData of testDataProvider) {
	test.skip(`Check that user sees vacancy by tags that were selected in ${testData.filterBlock} filter in side bar @Regression @FilterBlock @TSWEB-145`, async () => {
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
			Containers.FilterGroupWrapper,
			careerMainContainer
		);
		const filterTag = filterGroupContainer.getByTestId(testData.tagName);
		const activeTagsGroupContainer = await containerSteps.getContainer(
			ContainerByClass,
			Containers.ActiveTagsGroupWrapper,
			careerMainContainer
		);
		const activeTag = activeTagsGroupContainer.getByTestId(testData.tagName);

		await filterTag.click();
		await driver.executeFunc(async () => {
			await expect(filterTag).toHaveClass(/active-tag/);
			expect(
				await filterTag.evaluate(async (el) => {
					return getComputedStyle(el).backgroundColor;
				})
			).toBe(ColorsEnum.OrangeYellow);
		}, 5);
		await expect(activeTag).toHaveClass(/active-tag/);
		expect(await activeTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(ColorsEnum.OrangeYellow);
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
