import { driver } from "../driver/Driver";
import { BrowsersEnum } from "../driver/BrowsersEnum";

export default class BaseDriverSteps {
    public static async createsNewBrowser(browserName: BrowsersEnum = BrowsersEnum.DEFAULT_BROWSER) {
        await driver.createBrowser(browserName);
    }

    public static async createNewPage() {
        let newPage = await driver.DriverContext.newPage();
        driver.Page = newPage;
        driver.ListOfPages.push(newPage);
    }

    public static async switchToBrowser(browserName: BrowsersEnum) {
        driver.focusedDriver = driver.listOfDrivers.find(x => x.DriverName === browserName)!;
    }

    public static async switchToBrowserTab(tabNumber: number) {
        driver.Page = driver.ListOfPages[tabNumber];
    }

    public static async closeBrowser() {
        await driver.DriverContext.close();
    }

    public static async closeBrowserTab() {
        await driver.Page.close();
    }

    public static async goToUrl(url: string) {
        await driver.Page.goto(url);
    }
}