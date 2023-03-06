import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../base/component/BaseComponent";

export default class ContainerById extends BaseComponent {
    constructor(page: Page, identifier: string, parent?: Locator) {
        super(page, identifier, parent);
        this.ComponentContext = `//div[contains(@class, "${identifier}")]`;
    }
}