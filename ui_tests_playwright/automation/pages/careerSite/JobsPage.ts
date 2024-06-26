import BasePage from '../../base/page/BasePage';
import ContainerByClass from '../../components/container/ContainerByClass';
import Career from '../../identifiers/career/pages/Career';
import {containerSteps} from '../../fixtures/DesktopMobileSetup';

export default class JobsPage extends BasePage {
	public applyJobBlock() {
		return this.page.locator('//div[contains(@class, "styledComponents__ApplyPropositionWrapper")]');
	}

	public async getDropdownByName(name: string) {
		const careerMainContainer = await containerSteps.getContainer(ContainerByClass, {
			desktopLocator: Career.CareerMainBody,
		});
		return careerMainContainer.locator(`//div[@class='group-title' and text()='${name}']//ancestor::span`);
	}
}
