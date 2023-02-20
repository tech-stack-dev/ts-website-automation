import { Locator } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";

export default class ButtonSteps {
    public static async clickButton(type: any, identifier: string, parent?: Locator) {
        await (await driver.component(type, identifier, parent)).click();
    }
}