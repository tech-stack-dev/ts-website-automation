import {driver} from '../../../../../../base/driver/Driver';
import {baseDriverSteps} from '../../../../../../base/step/BaseDriverSteps';
import ContainerByClass from '../../../../../../components/container/ContainerByClass';
import ContainersCareer from '../../../../../../identifiers/career/ContainersCareer';
import UrlProvider from '../../../../../../providers/UrlProvider';
import {sessionValue} from '../../../../../../runtimeVariables/SessionValue';
import {careerSteps, containerSteps, expect, test} from '../../../../../../fixtures/DesktopMobileSetup';
import {contentfulSteps} from '../../../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../../../utils/ContentfulUtils';
import {ColorsEnum} from '../../../../../../enum/ColorsEnum';
import {TagsEnum} from '../../../../../../enum/tag/TagsEnum';
import TagsCareer from '../../../../../../identifiers/career/TagsCareer';
import {SeniorityLevelsEnum} from '../../../../../../enum/tag/SeniorityLevelsEnum';
import {DirectionsEnum} from '../../../../../../enum/tag/DirectionsEnum';
import Career from '../../../../../../identifiers/career/pages/Career';
import {locatorUtils} from '../../../../../../utils/LocatorUtils';
import {playwrightUtils} from '../../../../../../utils/PlaywrightUtils';
import {qase} from 'playwright-qase-reporter/dist/playwright';
import {IContainerOptions} from '../../../../../../steps/components/container/ContainerSteps';

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
	test(
		qase(
			[4825, 4837, 4842, 4856],
			`Check that user sees vacancy by tags that were selected in ${testData.filterBlock} filter in side bar @desktop @mobile @Regression @FilterBlock @TSWEB-145`
		),
		async () => {
			contentfulUtils.AddTagsToCareerBody(testData.createTag);
			await contentfulSteps.createCareerWithDefaultValue(
				`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
				`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
				`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
			);
			await careerSteps.verifyThatCareerWasCreated(
				`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`
			);

			const identifiers: IContainerOptions = {
				desktopLocator: Career.CareerMainBody,
				mobileLocator: Career.FilterList,
			};

			const careerMainContainer = await containerSteps.getContainer(ContainerByClass, identifiers);
			const filterGroupContainer = await containerSteps.getContainer(
				ContainerByClass,
				{desktopLocator: ContainersCareer.FilterGroupWrapper},
				careerMainContainer
			);
			const filterTag = filterGroupContainer.getByTestId(testData.tagName);
			const activeTagsGroupContainer = await containerSteps.getContainer(
				ContainerByClass,
				{desktopLocator: ContainersCareer.ActiveTagsGroupWrapper},
				careerMainContainer
			);
			const activeTag = activeTagsGroupContainer.getByTestId(testData.tagName);

			await careerSteps.clickOnFilter();

			await filterTag.click();
			// await driver.Page.mouse.move(0, 0);
			await playwrightUtils.expectWithRetries(async () => {
				await expect(filterTag).toHaveClass(/active-tag/);
				expect(await locatorUtils.checkBackgroundColor(filterTag, ColorsEnum.Yellow_FFC600)).toBeTruthy();
			}, 5);
			await playwrightUtils.expectWithRetries(
				async () => {
					expect(activeTag).toHaveClass(/active-tag/);
				},
				5,
				5000
			);
			await playwrightUtils.expectWithRetries(
				async () => {
					expect(await activeTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
						ColorsEnum.Yellow_FFC600
					);
				},
				5,
				5000
			);
		}
	);
}

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
