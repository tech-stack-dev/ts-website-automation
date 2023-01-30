import { BrowserContext, Locator, Page } from '@playwright/test';
import BaseComponent from '../component/BaseComponent';
import { driver } from './Driver';
import { BrowsersEnum } from './BrowsersEnum';

export default class BaseDriver {
    private _driverContext: BrowserContext;
    private _page: Page;
    private _listOfPages: Page[] = [];
    private _driverName: BrowsersEnum;

    public get DriverContext(): BrowserContext {
        return driver.focusedDriver._driverContext;
    }

    public set DriverContext(value: BrowserContext) {
        driver.focusedDriver._driverContext = value;
    }

    public get Page(): Page {
        return driver.focusedDriver._page;
    }

    public set Page(value: Page) {
        driver.focusedDriver._page = value;
    }

    public get ListOfPages(): Page[] {
        return driver.focusedDriver._listOfPages;
    }

    public set ListOfPages(value: Page[]) {
        driver.focusedDriver._listOfPages = value;
    }

    public get DriverName(): BrowsersEnum {
        return this._driverName;
    }

    public set DriverName(value: BrowsersEnum) {
        this._driverName = value;
    }

    // All permissions https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions
    private _permissions: string[];

    // All args https://peter.sh/experiments/chromium-command-line-switches/
    private _args: string[];

    public get Permissions(): string[] {
        return driver.focusedDriver._permissions;
    }

    public set Permissions(permissions: string[]) {
        driver.focusedDriver._permissions = permissions;
    }

    public get Args(): string[] {
        return driver.focusedDriver._args;
    }

    public set Args(args: string[]) {
        driver.focusedDriver._args = args;
    }

    public async component<T extends BaseComponent>(type: { new(page: Page, identifier: string, parent: Locator | undefined): T; }, identifier: string, parent?: Locator): Promise<T> {
        return await this.componentBuild(new type(driver.focusedDriver.Page, identifier, parent));
    }

    private async componentBuild<T extends BaseComponent>(component: T): Promise<T> {
        if (component.Parent) {
            component.Element = component.Parent.locator(`xpath=${component.ComponentContext}`);
        }
        else {
            component.Element = component.Page.locator(`xpath=${component.ComponentContext}`);
        }
        return component;
    }

    public locator(selector: string, baseElement?: Locator): Locator {
        if (baseElement) {
            return baseElement.locator(selector);
        }
        else {
            return driver.focusedDriver.Page.locator(selector);
        }
    }

    public async getPage<T>(type: { new(page: Page): T; }) {
        return await new type(driver.focusedDriver.Page);
    }
}