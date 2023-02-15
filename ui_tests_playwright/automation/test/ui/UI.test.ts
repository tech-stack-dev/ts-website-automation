import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import BaseDriverSteps from "../../base/step/BaseDriverSteps";
import ButtonByDataId from "../../components/Button/ButtonByDataId";
import AboutUs from "../../identifiers/AboutUs";
import Button from "../../identifiers/Button";
import UrlProvider from "../../providers/UrlProvider";
import ButtonSteps from "../../steps/components/Button/ButtonSteps";
import ContainerSteps from "../../steps/components/Container/ContainerSteps";

test.beforeEach(async () => {
    await BaseDriverSteps.createsNewBrowser();
    await BaseDriverSteps.goToUrl(UrlProvider.webSiteUrl());
    await ButtonSteps.clickButton(ButtonByDataId, Button.NavigationTab_AboutUs);
});

test("Test check 'We are Techstack' section", async () => {
    await ContainerSteps.checkContainerNumber(AboutUs.WeAreTechstackId, "01");
    await ContainerSteps.checkContainerTitle(AboutUs.WeAreTechstackId, "We are Techstack");
});

test.afterEach(async () => {
    await driver.closeDrivers();
})