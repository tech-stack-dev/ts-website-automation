import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Button from '../../../../identifiers/Button';
import UrlProvider from '../../../../providers/UrlProvider';
import {sessionValue} from '../../../../runtimeVariables/SessionValue';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import Containers from '../../../../identifiers/Containers';
import {driver} from '../../../../base/driver/Driver';
import {contentfulSteps} from '../../../../steps/contentful/ContentfulSteps';
import {contentfulUtils} from '../../../../utils/ContentfulUtils';
import {ColorsEnum} from '../../../../enum/ColorsEnum';
import {SeniorityLevelsEnum} from '../../../../enum/tag/SeniorityLevelsEnum';
import {careerSteps} from '../../../../steps/careerPageSteps/CareerSteps';
import Tag from '../../../../identifiers/Tag';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	contentfulUtils.AddTagsToCareerBody([SeniorityLevelsEnum.Junior]);
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);
});

test('Check that user can reset selected tags from seniority filter in side bar @Regression @FilterBlock @TSWEB-145 @TSWEB-622', async () => {
	const tagList: Array<string> = [Tag.JuniorTag, Tag.TraineeTag];
	const careerMainContainer = await containerSteps.getContainer(ContainerByClass, Containers.CareerMainBody);
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

	for (const tag of tagList) {
		const filterTag = filterGroupContainer.getByTestId(tag);
		await filterTag.click();
		await expect(filterTag).toHaveClass(/active-tag/);
		const activeTag = activeTagsGroupContainer.Element.getByTestId(tag);
		await expect(activeTag).toHaveClass(/active-tag/);
	}

	await activeTagsGroupContainer.Element.getByTestId(Button.ResetButton).click();
	tagList.forEach(async (tag) => {
		const filterTag = filterGroupContainer.getByTestId(tag);
		await expect(filterTag).not.toHaveClass(/active-tag/);
	});
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
