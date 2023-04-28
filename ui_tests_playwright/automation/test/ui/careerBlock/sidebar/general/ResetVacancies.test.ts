import {expect, test} from '@playwright/test';
import {driver} from '../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {SeniorityLevelsEnum} from '../../../../../enum/tag/SeniorityLevelsEnum';
import {TagsEnum} from '../../../../../enum/tag/TagsEnum';
import Containers from '../../../../../identifiers/Containers';
import UrlProvider from '../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../runtimeVariables/SessionValue';
import Tag from '../../../../../identifiers/Tag';
import Button from '../../../../../identifiers/Button';
import {DirectionsEnum} from '../../../../../enum/tag/DirectionsEnum';
import {careerSteps} from '../../../../../steps/careerPageSteps/CareerSteps';
import ContainerByClass from '../../../../../components/container/ContainerByClass';
import {containerSteps} from '../../../../../steps/components/container/ContainerSteps';
import Career from '../../../../../identifiers/Career';
import {contentfulSteps} from '../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../utils/ContentfulUtils';

const testDataProvider = [
	{
		filterBlock: 'seniority level',
		createTags: [SeniorityLevelsEnum.Trainee, SeniorityLevelsEnum.Junior],
		tagList: [Tag.JuniorTag, Tag.TraineeTag],
	},
	{
		filterBlock: 'direction',
		createTags: [DirectionsEnum.LongSoftwareDataManager, DirectionsEnum.SoftwareDevelopment],
		tagList: [Tag.LongSoftwareDataManager, Tag.SoftwareDevelopment],
	},
	{
		filterBlock: 'technology stack',
		createTags: [TagsEnum.StackJava, TagsEnum.DevOps],
		tagList: [Tag.JavaTag, Tag.DevOpsTag],
	},
	{
		filterBlock: 'tags',
		createTags: [TagsEnum.RemoteAllowed, TagsEnum.PartTime],
		tagList: [Tag.RemoteAllowedTag, Tag.PartTimeTag],
	},
];

for (const testData of testDataProvider) {
	test(`Check that user can reset selected tags from ${testData.filterBlock} filter in side bar @Regression @FilterBlock @TSWEB-145`, async () => {
		await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
		contentfulUtils.AddTagsToCareerBody(testData.createTags);
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
		const activeTagsGroupContainer = await containerSteps.getContainer(
			ContainerByClass,
			Containers.ActiveTagsGroupWrapper,
			careerMainContainer
		);

		for (const tag of testData.tagList) {
			const filterTag = filterGroupContainer.getByTestId(tag);
			await filterTag.click();
			await expect(filterTag).toHaveClass(/active-tag/);
			const activeTag = activeTagsGroupContainer.Element.getByTestId(tag);
			await expect(activeTag).toHaveClass(/active-tag/);
		}

		await activeTagsGroupContainer.Element.getByTestId(Button.ResetButton).click();
		testData.tagList.forEach(async (tag) => {
			const filterTag = filterGroupContainer.getByTestId(tag);
			await expect(filterTag).not.toHaveClass(/active-tag/);
		});
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
