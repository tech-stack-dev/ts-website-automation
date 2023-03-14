import { expect, Locator } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";

export class ButtonSteps {
  public async clickButton(type: any, identifier: string, times: number = 1, parent?: Locator) {
    for (let index = 0; index < times; index++) {
      await (await driver.component(type, identifier, parent)).click();
    }
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

const buttonSteps = new ButtonSteps();

export {buttonSteps};
