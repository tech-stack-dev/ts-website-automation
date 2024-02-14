import {Locator} from '@playwright/test';
import {ContainerSteps} from '../../components/container/ContainerSteps';
import {driver} from '../../../base/driver/Driver';
import {IContainerOptions} from './ContainerSteps';
import BaseComponent from '../../../base/component/BaseComponent';

class MobileContainerSteps extends ContainerSteps {
	async getContainer(type: any, identifier: IContainerOptions, parent?: Locator | undefined): Promise<BaseComponent> {
		const typeOfIdentidier = identifier.mobileLocator ? identifier.mobileLocator : identifier.desktopLocator;

		return driver.component(type, typeOfIdentidier, parent);
	}
}
const mobileContainerSteps = new MobileContainerSteps();

export {mobileContainerSteps};
