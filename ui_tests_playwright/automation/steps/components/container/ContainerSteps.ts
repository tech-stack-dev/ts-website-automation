import {Locator, expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import ContainerById from '../../../components/container/ContainerById';
import Container from '../../../identifiers/Container';

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

	public async getContainerBlockByTitle(container: Locator, titleElement: string, title: string) {
		const blockList = await container.getByTestId(Container.ContainerBlock).all();
		for (const block of blockList) {
			if (await block.getByTestId(titleElement).isVisible()) {
				const blockTitle = await block.getByTestId(titleElement)?.textContent();
				if (blockTitle === title) {
					return block;
				}
			}
		}
	}
}

const containerSteps = new ContainerSteps();
export {containerSteps};
