import { driver } from "../driver/Driver";
import { BrowsersEnum } from "../driver/BrowsersEnum";
import { expect } from "@playwright/test";

class BaseDriverSteps {
    public async createsNewBrowser(browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER) {
        await driver.createBrowser(browserName);
    }

    public async createNewPage() {
        let newPage = await driver.DriverContext.newPage();
        driver.Page = newPage;
        driver.ListOfPages.push(newPage);
    }

    public async switchToBrowser(browserName: BrowsersEnum) {
        driver.focusedDriver = driver.listOfDrivers.find(x => x.DriverName === browserName)!;
    }

    public async switchToBrowserTab(tabNumber: number) {
        driver.Page = driver.ListOfPages[tabNumber];
    }

    public async closeBrowser() {
        await driver.DriverContext.close();
    }

    public async closeBrowserTab() {
        await driver.Page.close();
    }

    public async goToUrl(url: string) {
        await driver.Page.goto(url);
    }
    
    public async checkUrl(expectedUrl: string) {
        await expect(await driver.Page.url()).toEqual(expectedUrl);
    }
}

var baseDriverSteps = new BaseDriverSteps();

export { baseDriverSteps };