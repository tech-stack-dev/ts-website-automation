import { Page } from "@playwright/test";
import BaseComponent from "../../base/component/BaseComponent";

export default class ModalWindowById extends BaseComponent {
    constructor(page: Page, identifier: string) {
        super(page, identifier);
        this.ComponentContext = `//div[@id="${identifier}"]`;
    }
}