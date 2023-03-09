import { expect } from "@playwright/test";
import ContainerById from "../../../components/Container/ContainerById";
import { Locator } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";

class ContainerSteps {
    public  async getContainer(identifier: string) {
        return await driver.component(ContainerById, identifier);
    }

    public async checkContainerNumber(identifier: string, expectedNumber: string) {
        let sectionNumber = (await driver.component(ContainerById, identifier)).sectionNumber;
        await expect(sectionNumber).toHaveText(expectedNumber);
    }

    public async checkContainerTitle(identifier: string, expectedTitle: string, parent?: Locator) {
        let title = await (await driver.component(ContainerById, identifier, parent)).title;
        await expect(title).toHaveText(expectedTitle);
    }

    public async checkContainerBlockTitle(identifier: string, expectedTitle: string, parent?: Locator) {
        let title = await (await driver.component(ContainerById, identifier, parent)).block_title;
        await expect(title).toHaveText(expectedTitle);
    }

    public async checkContainerText(identifier: string, expectedTitle: string, parent?: Locator) {
        let text = await (await driver.component(ContainerById, identifier, parent)).textContent();
        await expect(text).toContain(expectedTitle);
    }
}

var containerSteps = new ContainerSteps();

export { containerSteps };