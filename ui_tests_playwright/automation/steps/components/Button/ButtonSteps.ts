import { Locator } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";

class ButtonSteps {
    public async clickButton(type: any, identifier: string, parent?: Locator) {
        await (await driver.component(type, identifier, parent)).click();
    }
}

var buttonSteps = new ButtonSteps();

export { buttonSteps };