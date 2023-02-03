import { Browser, chromium } from "@playwright/test";
import BaseDriver from "./BaseDriver";
import { BrowsersEnum } from "./BrowsersEnum";

class Driver extends BaseDriver {
    public browser: Browser;
    public focusedDriver: BaseDriver;
    public listOfDrivers: BaseDriver[] = [];

    public async createBrowser(browserName: BrowsersEnum) {
        driver.focusedDriver = new BaseDriver();

        if (driver.browser === undefined) {
            // Uncomment if List of Chromium Commands needed
            driver.browser = await chromium.launch({ headless: true /*, args: driver.driver.args*/ });
        }

        driver.focusedDriver.DriverName = browserName;
        driver.focusedDriver.DriverContext = await driver.browser.newContext();
        // Uncomment if permissions needed
        // await driver.driver.context.grantPermissions(driver.driver.permissions);
        driver.focusedDriver.Page = await driver.focusedDriver.DriverContext.newPage();
        driver.focusedDriver.ListOfPages.push(driver.focusedDriver.Page);
        driver.listOfDrivers.push(driver.focusedDriver);

        return this;
    }

    public async closeDrivers() {
        for (const driver of this.listOfDrivers) {
            await driver.DriverContext.close()
        }

        driver.listOfDrivers = [];
    }
}

var driver = new Driver();

export { driver };