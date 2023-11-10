import {expect, test} from '@playwright/test';
import {driver} from '../../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../../base/step/BaseDriverSteps';
import {SeniorityLevelsEnum} from '../../../../../../enum/tag/SeniorityLevelsEnum';
import {TagsEnum} from '../../../../../../enum/tag/TagsEnum';
import ContainersCareer from '../../../../../../identifiers/career/ContainersCareer';
import UrlProvider from '../../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../../runtimeVariables/SessionValue';
import TagsCareer from '../../../../../../identifiers/career/TagsCareer';
import CareerButtons from '../../../../../../identifiers/career/CareerButtons';
import {DirectionsEnum} from '../../../../../../enum/tag/DirectionsEnum';
import {careerSteps} from '../../../../../../steps/careerPageSteps/CareerSteps';
import ContainerByClass from '../../../../../../components/container/ContainerByClass';
import {containerSteps} from '../../../../../../steps/components/container/ContainerSteps';
import Career from '../../../../../../identifiers/career/pages/Career';
import {contentfulSteps} from '../../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../../utils/ContentfulUtils';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

const testDataProvider = [
	{
		filterBlock: 'seniority level',
		createTags: [SeniorityLevelsEnum.Trainee, SeniorityLevelsEnum.Junior],
		tagList: [TagsCareer.JuniorTag, TagsCareer.TraineeTag],
	},
	{
		filterBlock: 'direction',
		createTags: [DirectionsEnum.LongSoftwareDataManager, DirectionsEnum.SoftwareDevelopment],
		tagList: [TagsCareer.LongSoftwareDataManager, TagsCareer.SoftwareDevelopment],
	},
	{
		filterBlock: 'technology stack',
		createTags: [TagsEnum.StackJava, TagsEnum.DevOps],
		tagList: [TagsCareer.JavaTag, TagsCareer.DevOpsTag],
	},
	{
		filterBlock: 'tags',
		createTags: [TagsEnum.RemoteAllowed, TagsEnum.PartTime],
		tagList: [TagsCareer.RemoteAllowedTag, TagsCareer.PartTimeTag],
	},
];

for (const testData of testDataProvider) {
	test(`Check that user can reset selected tags from ${testData.filterBlock} filter in side bar @Regression @FilterBlock @TSWEB-145`, async () => {
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
			ContainersCareer.FilterGroupWrapper,
			careerMainContainer
		);
		const activeTagsGroupContainer = await containerSteps.getContainer(
			ContainerByClass,
			ContainersCareer.ActiveTagsGroupWrapper,
			careerMainContainer
		);

		for (const tag of testData.tagList) {
			const filterTag = filterGroupContainer.getByTestId(tag);
			await filterTag.click();
			await driver.Page.waitForLoadState();
			await expect(filterTag).toHaveClass(/active-tag/);
			const activeTag = activeTagsGroupContainer.Element.getByTestId(tag);
			await expect(activeTag).toHaveClass(/active-tag/);
		}

		await Promise.all([
			activeTagsGroupContainer.Element.getByTestId(CareerButtons.ResetButton).click(),
			await driver.Page.waitForLoadState(),
			testData.tagList.forEach(async (tag) => {
				const filterTag = filterGroupContainer.getByTestId(tag);
				await expect(filterTag).not.toHaveClass(/active-tag/);
			}),
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
