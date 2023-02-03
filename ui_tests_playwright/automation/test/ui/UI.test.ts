import { test } from "@playwright/test";
import { BrowsersEnum } from "../../base/driver/BrowsersEnum";
import { driver } from "../../base/driver/Driver";
import BaseDriverSteps from "../../base/step/BaseDriverSteps";
import ButtonById from "../../components/Button/ButtonById";
import ModalWindowById from "../../components/ModalWindow/ModalWindowById";
import Header from "../../identifiers/Header";
import ModalMenu from "../../identifiers/ModalMenu";
import UrlProvider from "../../providers/UrlProvider";
import ButtonSteps from "../../steps/components/Button/ButtonSteps";
import MenuPageSteps from "../../steps/ui/MenuPageSteps";

let baseActionSteps = new BaseDriverSteps();
let menuPageSteps = new MenuPageSteps();
let buttonSteps = new ButtonSteps();

test.beforeEach(async () => {
    await baseActionSteps.createsNewBrowser(BrowsersEnum.Browser_1);
    await baseActionSteps.goToUrl(UrlProvider.webSiteUrl());
}); 

test("Test example", async () => {
    await menuPageSteps.openAndClosesMenu();
    await menuPageSteps.seeLogo();
});

test("Test example with 2 browsers and 2 pages", async () => {
    await baseActionSteps.createsNewBrowser(BrowsersEnum.Browser_2);
    await baseActionSteps.goToUrl(UrlProvider.webSiteUrl());

    await menuPageSteps.openAndClosesMenu();

    await baseActionSteps.createNewPage();
    await baseActionSteps.goToUrl(UrlProvider.webSiteUrl());

    await menuPageSteps.clickContactUsButton();

    await baseActionSteps.switchToBrowser(BrowsersEnum.Browser_1);
    await baseActionSteps.closeBrowser();
});

test("Test example with components", async () => {
    await buttonSteps.clickButton(ButtonById, Header.MenuButton);
    
    let modalMenuComponent = await driver.component(ModalWindowById, ModalMenu.ModalMenu);
    await buttonSteps.clickButton(ButtonById, ModalMenu.CloseModalMenuButton, modalMenuComponent);
});

test.afterEach(async () => {
    await driver.closeDrivers();
})