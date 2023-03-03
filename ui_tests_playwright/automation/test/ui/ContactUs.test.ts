import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import { baseDriverSteps } from "../../base/step/BaseDriverSteps";
import Button from "../../identifiers/Button";
import { urlProvider } from "../../providers/UrlProvider";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @ContactUs", async () => {
    let urlList: Array<string> = [
        urlProvider.getUrl().ourServicesUrl,
        urlProvider.getUrl().customDevUrl,
        urlProvider.getUrl().cloudAndDevUrl,
        urlProvider.getUrl().bigDataUrl,
        urlProvider.getUrl().internetOfThingsUrl,
        urlProvider.getUrl().mobileDevUrl,
        urlProvider.getUrl().uiUxDesignUrl,
        urlProvider.getUrl().qaAsAServUrl,
        urlProvider.getUrl().consultingServUrl
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
    }
});

test("Check 'Contact Us' button from 'Company' section @ContactUs", async () => {
    let urlList: Array<string> = [
        urlProvider.getUrl().aboutUs,
        urlProvider.getUrl().howWeWork,
        urlProvider.getUrl().caseStudies,
        urlProvider.getUrl().blog
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
    }
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @ContactUs", async () => {
    let urlList: Array<string> = [
        urlProvider.getUrl().contactUs,
        urlProvider.getUrl().site
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(urlProvider.getUrl().contactUs);
    }
});

test.afterEach(async () => {
    await driver.closeDrivers();
})