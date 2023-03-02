import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import { baseDriverSteps } from "../../base/step/BaseDriverSteps";
import Button from "../../identifiers/Button";
import { urlProvider } from "../../providers/UrlProvider";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @ContactUs", async () => {
    await baseDriverSteps.goToUrl(urlProvider.getUrl().ourServicesUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().customDevUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().cloudAndDevUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().bigDataUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().internetOfThingsUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().mobileDevUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().uiUxDesignUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().qaAsAServUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().consultingServUrl);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
});

test("Check 'Contact Us' button from 'Company' section @ContactUs", async () => {
    await baseDriverSteps.goToUrl(urlProvider.getUrl().aboutUs);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().howWeWork);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().caseStudies);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().blog);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @ContactUs", async () => {
    await baseDriverSteps.goToUrl(urlProvider.getUrl().contactUs);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);

    await baseDriverSteps.goToUrl(urlProvider.getUrl().site);
    await driver.getByTestId(Button.ContactUs).click();
    await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
});

test.afterEach(async () => {
    await driver.closeDrivers();
})