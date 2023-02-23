import { expect } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";
import ContainerById from "../../../components/Container/ContainerById";

export default class ContainerSteps {
    public static async getContainer(identifier: string) {
        await driver.component(ContainerById, identifier);
    }

    public static async checkContainerNumber(identifier: string, expectedNumber: string) {
        let sectionNumber = (await driver.component(ContainerById, identifier)).sectionNumber;

        await expect(sectionNumber).toHaveText(expectedNumber);
    }

    public static async checkContainerTitle(identifier: string, expectedTitle: string) {
        let title = (await driver.component(ContainerById, identifier)).title;

        await expect(title).toHaveText(expectedTitle);
    }
}