import {Locator, expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import ContainerById from '../../../components/container/ContainerById';

class ContainerSteps {
	public async getContainer(type: any, identifier: string, parent?: Locator) {
		return await driver.component(type, identifier, parent);
	}

	public async checkContainerNumber(identifier: string, expectedNumber: string) {
		const sectionNumber = (await driver.component(ContainerById, identifier)).sectionNumber;
		await expect(sectionNumber).toHaveText(expectedNumber);
	}

	public async checkContainerTitle(identifier: string, expectedTitle: string) {
		const title = (await driver.component(ContainerById, identifier)).title;
		await expect(title).toHaveText(expectedTitle);
	}
}

const containerSteps = new ContainerSteps();
export {containerSteps};
