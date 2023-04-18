import {ElementHandle, expect, test} from '@playwright/test';
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
import {ColorEnum} from '../../../../enum/ColorEnum';
import {SeniorityLevelsEnum} from '../../../../enum/tag/SeniorityLevelsEnum';
import {careerSteps} from '../../../../steps/careerPageSteps/CareerSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user sees vacancy selected from seniority block in side bar @Regression @FilterBlock @TSWEB-145', async () => {
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

	const careerMainContainer = await containerSteps.getContainer(ContainerByClass, Containers.careerMainBody);
	const filterGroupContainer = await containerSteps.getContainer(
		ContainerByClass,
		Containers.filterGroupWrapper,
		careerMainContainer.Element
	);
	const tagDataId = Button.tagWithoutModifier.concat('Trainee');
	const filterTag = filterGroupContainer.Element.getByTestId(tagDataId);
	await filterTag.click();
	await driver.executeFunc(async () => {
		await expect(filterTag).toHaveClass(/active-tag/);

		expect(
			await filterTag.evaluate(async (el) => {
				return getComputedStyle(el).backgroundColor;
			})
		).toBe(ColorEnum.OrangeYellow);
	}, 5);

	const activeTagsGroupContainer = await containerSteps.getContainer(
		ContainerByClass,
		Containers.activeTagsGroupWrapper,
		careerMainContainer.Element
	);
	const activeTag = activeTagsGroupContainer.Element.getByTestId(tagDataId);
	await expect(activeTag).toHaveClass(/active-tag/);
	expect(await activeTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(ColorEnum.OrangeYellow);
});

test('Check that user can reset selected tags from seniority side bar @Regression @FilterBlock @TSWEB-145', async () => {
	await contentfulUtils.AddTagsToCareerBody([SeniorityLevelsEnum.Junior]);
	await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
	await careerSteps.verifyThatCareerWasCreated(`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`);

	const tagList: Array<string> = [`Junior`, `Trainee`];
	const careerMainContainer = await containerSteps.getContainer(ContainerByClass, Containers.careerMainBody);
	const filterGroupContainer = await containerSteps.getContainer(
		ContainerByClass,
		Containers.filterGroupWrapper,
		careerMainContainer.Element
	);
	const activeTagsGroupContainer = await containerSteps.getContainer(
		ContainerByClass,
		Containers.activeTagsGroupWrapper,
		careerMainContainer.Element
	);

	tagList.forEach(async (tag) => {
		const tagDataId = Button.tagWithoutModifier.concat(tag);

		await driver.executeFunc(async () => {
			const filterTag = filterGroupContainer.Element.getByTestId(tagDataId);
			await filterTag.click();
			await expect(filterTag).toHaveClass(/active-tag/);
		}, 5);

		const activeTag = activeTagsGroupContainer.Element.getByTestId(tagDataId);
		await expect(activeTag).toHaveClass(/active-tag/);
	});

	await driver.executeFunc(async () => {
		await activeTagsGroupContainer.Element.getByTestId(Button.resetButton).click();
	}, 5);

	tagList.forEach(async (tag) => {
		const tagDataId = Button.tagWithoutModifier.concat(tag);
		const filterTag = filterGroupContainer.Element.getByTestId(tagDataId);
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
