import { test } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import { baseDriverSteps } from "../../base/step/BaseDriverSteps";
import Button from "../../identifiers/Button";
import UrlPath from "../../providers/UrlPath";
import UrlProvider from "../../providers/UrlProvider";

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
});

test("Check 'Contact Us' button from 'Services' section @Regression @ContactUs @TSWEB-532", async () => {
    let urlList: Array<string> = [
        UrlProvider.urlBilder(UrlPath.OurServices),
        UrlProvider.urlBilder(UrlPath.CustomDev),
        UrlProvider.urlBilder(UrlPath.CloudAndDev),
        UrlProvider.urlBilder(UrlPath.BigData),
        UrlProvider.urlBilder(UrlPath.InternetOfThings),
        UrlProvider.urlBilder(UrlPath.MobileDev),
        UrlProvider.urlBilder(UrlPath.UiUxDesign),
        UrlProvider.urlBilder(UrlPath.QaAsAServ),
        UrlProvider.urlBilder(UrlPath.ConsultingServ)
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(UrlProvider.urlBilder(UrlPath.ContactUs));
    }
});

test("Check 'Contact Us' button from 'Company' section @Regression @ContactUs @TSWEB-532", async () => {
    let urlList: Array<string> = [
        UrlProvider.urlBilder(UrlPath.AboutUs),
        UrlProvider.urlBilder(UrlPath.HowWeWork),
        UrlProvider.urlBilder(UrlPath.CaseStudies),
        UrlProvider.urlBilder(UrlPath.Blog)
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(UrlProvider.urlBilder(UrlPath.ContactUs));
    }
});

test("Check 'Contact Us' button from 'Contact Us' section and from main page @Regression @ContactUs @TSWEB-532", async () => {
    let urlList: Array<string> = [
        UrlProvider.urlBilder(UrlPath.ContactUs),
        UrlProvider.webSiteUrl()
    ];

    for (let url of urlList) {
        await baseDriverSteps.goToUrl(url);
        await driver.getByTestId(Button.ContactUs).click();
        await baseDriverSteps.checkUrl(UrlProvider.urlBilder(UrlPath.ContactUs));
    }
});

test.afterEach(async () => {
    await driver.closeDrivers();
})