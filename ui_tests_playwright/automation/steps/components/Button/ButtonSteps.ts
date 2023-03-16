import {expect, Locator} from "@playwright/test";
import {driver} from "../../../base/driver/Driver";

class ButtonSteps {
    public async clickButton(type: any, identifier: string, times: number = 1, parent?: Locator) {
        await (await driver.component(type, identifier, parent)).click({clickCount: times, delay: 10});
    }

    public async isEnabled(type: any, identifier: string, parent?: Locator) {
        await (await driver.component(type, identifier, parent)).isEnabled();
    }

    public async isDisabled(type: any, identifier: string, parent?: Locator) {
        await (await driver.component(type, identifier, parent)).isDisabled();
    }

    public async buttonContainsClassProperty(type: any, identifier: string, prop: string, parent?: Locator) {
        let classValue = await (await driver.component(type, identifier, parent)).getAttribute("class");
        expect(classValue).toContain(prop);
    }
}

var buttonSteps = new ButtonSteps();

export {buttonSteps};