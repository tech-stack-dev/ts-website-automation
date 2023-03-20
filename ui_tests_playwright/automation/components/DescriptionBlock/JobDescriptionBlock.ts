import {Locator, Page} from '@playwright/test';
import BaseComponent from '../../base/component/BaseComponent';

export default class JobDescriptionBlock extends BaseComponent {
	constructor(page: Page, identifier: string, parent?: Locator) {
		super(page, identifier, parent);
		this.ComponentContext = `//div[@id="${identifier}"]`;
	}

    public get title() {
		return this.Element.locator("//div[@class='block-title']");
	}

    public get description() {
		return this.Element.locator("//div[@class='text-description']");
	}
}
