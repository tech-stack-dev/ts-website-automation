import { expect, test } from "@playwright/test";
import { baseDriverSteps } from "../../../../base/step/BaseDriverSteps";
import Button from "../../../../identifiers/Button";
import UrlProvider from "../../../../providers/UrlProvider";
import { sessionValue } from "../../../../runtimeVariables/SessionValue";
import { containerSteps } from "../../../../steps/components/container/ContainerSteps";
import ContainerByClass from "../../../../components/container/ContainerByClass";
import Containers from "../../../../identifiers/Containers";
import { driver } from "../../../../base/driver/Driver";
import { contentfulSteps } from "../../../../steps/contentful/ContentfulSteps";
import { contentfulUtils } from "../../../../utils/ContentfulUtils";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
    await contentfulUtils.CreateTag('Seniority', 'Test1Tag');
    await contentfulSteps.createCareerWithDefaultValue(
		`JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});

test("Check that user sees vacancy selected from seniority block in side bar @Regression @FilterBlock @TSWEB-145", async () => {
    await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
    const filterGroupContainer = await containerSteps.getContainer(ContainerByClass, Containers.filterGroupWrapper);
    const tagDataId = Button.tagWithoutModifier.concat(`Test1Tag${sessionValue.stringValue.toLocaleUpperCase()}`);
    const filterTag = filterGroupContainer.Element.getByTestId(tagDataId);

    // When User expects tags and careers on the page

    await filterTag.click();
    await expect(filterTag).toHaveClass(/active-tag/);
    expect(await filterTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(StatusCodes.OrangeYellow);

    const activeTagsGroupContainer = await containerSteps.getContainer(ContainerByClass, Containers.activeTagsGroupWrapper);
    const activeTag = activeTagsGroupContainer.Element.getByTestId(tagDataId);
    await expect(activeTag).toHaveClass(/active-tag/);
    expect(await activeTag.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(StatusCodes.OrangeYellow);
});

test("Check that user can reset selected tags from seniority side bar @Regression @FilterBlock @TSWEB-145", async () => {
    await contentfulUtils.CreateTag('Seniority', 'Test2Tag');

    const tagList: Array<string> = [`Test1Tag`, `Test2Tag`];
    await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
    const filterGroupContainer = await containerSteps.getContainer(ContainerByClass, Containers.filterGroupWrapper);
    const activeTagsGroupContainer = await containerSteps.getContainer(ContainerByClass, Containers.activeTagsGroupWrapper);

    // When User expects tags and careers on the page

    tagList.forEach(async tag => {
        const tagDataId = Button.tagWithoutModifier.concat(tag, sessionValue.stringValue.toLocaleUpperCase());
        const filterTag = filterGroupContainer.Element.getByTestId(tagDataId);
        await filterTag.click();
        await expect(filterTag).toHaveClass(/active-tag/);

        const activeTag = activeTagsGroupContainer.Element.getByTestId(tagDataId);
        await expect(activeTag).toHaveClass(/active-tag/);
    });

    activeTagsGroupContainer.Element.getByTestId(Button.resetButton).click();
    tagList.forEach(async tag => {
        const tagDataId = Button.tagWithoutModifier.concat(tag, sessionValue.stringValue.toLocaleUpperCase());
        const activeTag = activeTagsGroupContainer.Element.getByTestId(tagDataId);
        expect(activeTag).toBeNull();
    });
});

test.afterEach(async () => {
	await driver.closeDrivers();
    await contentfulUtils.DeleteTag('Test1Tag');
    await contentfulUtils.DeleteTag('Test2Tag');
	await contentfulSteps.deleteAndUnpublishCareer(
		`defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
		`defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
	);
});
