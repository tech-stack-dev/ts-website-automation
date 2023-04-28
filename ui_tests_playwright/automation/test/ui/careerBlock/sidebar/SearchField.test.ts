import { expect, test } from "@playwright/test";
import { baseDriverSteps } from "../../../../base/step/BaseDriverSteps";
import UrlProvider from "../../../../providers/UrlProvider";
import { sessionValue } from "../../../../runtimeVariables/SessionValue";
import { careerSteps } from "../../../../steps/careerPageSteps/CareerSteps";
import { contentfulSteps } from "../../../../steps/contentful/ContentfulSteps";
import { driver } from "../../../../base/driver/Driver";
import Containers from "../../../../identifiers/Containers";
import Career from "../../../../identifiers/Career";
import { containerSteps } from "../../../../steps/components/container/ContainerSteps";
import ContainerByClass from "../../../../components/container/ContainerByClass";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
    await contentfulSteps.createCareerWithDefaultValue(
        `JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`,
        `defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
        `defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
    );
});

test(`Check that user sees correct results when entering vacancy in 'Search' input in 'Career' block @Regression @FilterBlock @TSWEB-145`, async () => {
    const careerName = `JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`;
    await careerSteps.verifyThatCareerWasCreated(careerName);
    const careerCard = driver.getByTestId(`${Career.CareerCardWithoutModifier}${careerName}`);
    expect((await careerCard.all()).length).toBe(1);
});

test(`Check that user sees correct results when entering part of name vacancy in 'Search' input in 'Career' block @Regression @FilterBlock @TSWEB-145`, async () => {
    const career = `${Career.CareerCardWithoutModifier}JobsBlockTest${sessionValue.stringValue.toLocaleUpperCase()}`;
    await driver.executeFunc(async () => {
        await driver.Page.reload();
        await driver.getByTestId(Career.SarchCareerField).clear();
        await driver.getByTestId(Career.SarchCareerField).fill(sessionValue.stringValue.toLocaleUpperCase());
        await driver.getByTestId(Career.SearchButton).click();
        await driver.getByTestId(career).waitFor();
    }, 5);

    expect((await driver.getByTestId(career).all()).length).toBe(1);
});

test(`Check that user sees failed search result message after clearing 'Search' input in 'Career' block @Regression @FilterBlock @TSWEB-145`, async () => {
    await driver.Page.reload();
    await driver.getByTestId(Career.SarchCareerField).clear();
    await driver.getByTestId(Career.SarchCareerField).fill('wrongString');
    await driver.getByTestId(Career.SearchButton).click();
    const careerList = (await containerSteps.getContainer(ContainerByClass, Career.CareerList)).Element;
    await expect(careerList).toHaveText('Sorry, no matching jobs found :( Please refine your search criteria and try again');
});

test(`Check that user sees the same careers as on start page after inputting and clearing 'Search' input in 'Career' block @Regression @FilterBlock @TSWEB-145`, async () => {
    const careerListBefore = await (await containerSteps.getContainer(ContainerByClass, Career.CareerList)).all();
    await driver.Page.reload();
    await driver.getByTestId(Career.SarchCareerField).clear();
    await driver.getByTestId(Career.SarchCareerField).fill('wrongString');
    await driver.getByTestId(Career.SearchButton).click();
    await driver.getByTestId(Career.SarchCareerField).clear();
    const careerListAfter = await (await containerSteps.getContainer(ContainerByClass, Career.CareerList)).all();
    expect(careerListBefore).toMatchObject(careerListAfter);
});

test.afterEach(async () => {
    await driver.closeDrivers();
    await contentfulSteps.deleteAndUnpublishCareer(
        `defaultTestCareer${sessionValue.stringValue.toLocaleUpperCase()}`,
        `defaultTestDescription${sessionValue.stringValue.toLocaleUpperCase()}`
    );
});