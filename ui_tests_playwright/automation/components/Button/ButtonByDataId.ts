import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../base/component/BaseComponent";

export default class ButtonByDataId extends BaseComponent {
    constructor(page: Page, identifier: string, parent?: Locator) {
        super(page, identifier, parent);
        // Class value can contain as 'button' as 'Button' value 
        // controls should be in separate class!
        this.ComponentContext = `//*[@data-id='${identifier}']`;
    }
}