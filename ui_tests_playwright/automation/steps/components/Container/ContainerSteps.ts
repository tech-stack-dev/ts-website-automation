import { expect } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";
import ContainerById from "../../../components/Container/ContainerById";

class ContainerSteps {
    public async getContainer(identifier: string) {
        await driver.component(ContainerById, identifier);
    }

    public async checkContainerNumber(identifier: string, expectedNumber: string) {
        let sectionNumber = (await driver.component(ContainerById, identifier)).sectionNumber;

        await expect(sectionNumber).toHaveText(expectedNumber);
    }

    public async checkContainerTitle(identifier: string, expectedTitle: string) {
        let title = (await driver.component(ContainerById, identifier)).title;

        await expect(title).toHaveText(expectedTitle);
    }
}

var containerSteps = new ContainerSteps();

export { containerSteps };