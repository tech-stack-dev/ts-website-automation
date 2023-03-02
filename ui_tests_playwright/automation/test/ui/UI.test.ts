import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import { baseDriverSteps } from "../../base/step/BaseDriverSteps";
import ButtonByDataId from "../../components/Button/ButtonByDataId";
import AboutUs from "../../identifiers/AboutUs";
import Button from "../../identifiers/Button";
import { urlProvider } from "../../providers/UrlProvider";
import { buttonSteps } from "../../steps/components/Button/ButtonSteps";
import { containerSteps } from "../../steps/components/Container/ContainerSteps";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
    await baseDriverSteps.goToUrl(urlProvider.getUrl().career);
    await buttonSteps.clickButton(ButtonByDataId, Button.NavigationTab_AboutUs);
});

test("Test check 'We are Techstack' section", async () => {
    await containerSteps.checkContainerNumber(AboutUs.WeAreTechstackId, "01");
    await containerSteps.checkContainerTitle(AboutUs.WeAreTechstackId, "We are Techstack");
});

test.afterEach(async () => {
    await driver.closeDrivers();
})