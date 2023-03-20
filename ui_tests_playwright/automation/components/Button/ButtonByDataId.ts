import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../base/component/BaseComponent";

export default class ButtonByDataId extends BaseComponent {
    constructor(page: Page, identifier: string, parent?: Locator) {
        super(page, identifier, parent);
        // Sometimes the Button value is capitalized in the class value
        this.ComponentContext = `//*[contains(@class, 'utton') and @data-id='${identifier}']`;
    }
}