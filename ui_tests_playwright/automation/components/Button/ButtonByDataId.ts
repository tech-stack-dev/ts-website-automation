import {Locator, Page} from '@playwright/test';
import BaseComponent from '../../base/component/BaseComponent';

export default class ButtonByDataId extends BaseComponent {
<<<<<<< HEAD
    constructor(page: Page, identifier: string, parent?: Locator) {
        super(page, identifier, parent);
        // Class value can contain as 'button' as 'Button' value 
        this.ComponentContext = `//*[@data-id='${identifier}']`;
    }
}
=======
	constructor(page: Page, identifier: string, parent?: Locator) {
		super(page, identifier, parent);
		this.ComponentContext = `//*[contains(@class, 'button') and @data-id='${identifier}']`;
	}
}
>>>>>>> main
