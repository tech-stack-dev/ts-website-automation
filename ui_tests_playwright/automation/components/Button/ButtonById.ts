import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../base/component/BaseComponent";

export default class ButtonById extends BaseComponent {
    constructor(page: Page, identifier: string, parent?: Locator) {
        super(page, identifier, parent);
        this.ComponentContext = `//*[@id="${identifier}"]`;
    }

    public async clickButton() {
        await this.Element.click();
    }
}