import { expect } from "@playwright/test";
import MenuPage from "../../pages/MenuPage";
import { driver } from "../../base/driver/Driver";

export default class MenuPageSteps {
    public async openAndClosesMenu() {
        await (await driver.getPage(MenuPage)).clickOpenMenu();
        await (await driver.getPage(MenuPage)).clickCloseButton();
    }

    public async clickContactUsButton() {
        await (await driver.getPage(MenuPage)).contactUsButton().click();
    }

    public async seeLogo() {
        await expect((await driver.getPage(MenuPage)).logo()).toBeVisible();
    }
}