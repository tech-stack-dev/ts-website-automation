import {Locator} from '@playwright/test';
import {ContainerSteps} from '../../components/container/ContainerSteps';
import {driver} from '../../../base/driver/Driver';
import {IContainerOptions} from './ContainerSteps';
import BaseComponent from '../../../base/component/BaseComponent';

class DesktopContainerSteps extends ContainerSteps {
	async getContainer(type: any, identifier: IContainerOptions, parent?: Locator | undefined): Promise<BaseComponent> {
		return driver.component(type, identifier.desktopLocator, parent);
	}
}
const desktopContainerSteps = new DesktopContainerSteps();

export {desktopContainerSteps};
