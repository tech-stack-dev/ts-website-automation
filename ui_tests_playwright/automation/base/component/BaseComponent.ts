import { ElementHandle, Page, Locator, JSHandle, LocatorScreenshotOptions, FrameLocator } from '@playwright/test'

export default class BaseComponent implements Locator {
    private _element: Locator;
    private _parent: Locator;
    private _page: Page;
    private _componentContext: string;
    protected identifier: string;

    constructor(page: Page, identifier: string, parent?: Locator | undefined) {
        this.identifier = identifier;
        this._page = page;
        this._parent = parent!;
    }

    public get Element(): Locator {
        return this._element;
    }

    public set Element(value: Locator) {
        this._element = value;
    }

    public get Parent(): Locator {
        return this._parent;
    }

    public set Parent(value: Locator) {
        this._parent = value;
    }

    public get Page(): Page {
        return this._page;
    }

    public set Page(value: Page) {
        this._page = value;
    }

    public get ComponentContext() {
        return this._componentContext;
    }

    public set ComponentContext(context: string) {
        this._componentContext = context;
    }

    all(): Promise<Locator[]> {
        return this.Element.all();
    }

    blur(options?: {
        timeout?: number | undefined;
    } | undefined): Promise<void> {
        return this.Element.blur(options);
    }

    clear(options?: {
        force?: boolean | undefined;
        noWaitAfter?: boolean | undefined;
        timeout?: number | undefined;
    } | undefined): Promise<void> {
        return this.Element.clear(options);
    }

    getByAltText(
        text: string | RegExp,
        options?: {
            exact?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByAltText(text, options);
    }

    getByLabel(
        text: string | RegExp,
        options?: {
            exact?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByLabel(text, options);
    }

    getByPlaceholder(
        text: string | RegExp,
        options?: {
            exact?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByPlaceholder(text, options);
    }

    getByRole(
        role: "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem",
        options?: {
            checked?: boolean | undefined;
            disabled?: boolean | undefined;
            expanded?: boolean | undefined;
            includeHidden?: boolean | undefined;
            level?: number | undefined;
            name?: string | RegExp | undefined;
            pressed?: boolean | undefined;
            selected?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByRole(role, options);
    }

    getByTestId(testId: string): Locator {
        return this.Element.getByTestId(testId);
    }

    getByText(
        text: string | RegExp,
        options?: {
            exact?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByText(text, options);
    }

    getByTitle(
        text: string | RegExp,
        options?: {
            exact?: boolean | undefined;
        } | undefined): Locator {
        return this.Element.getByTitle(text, options);
    }

    evaluate<R>(
        pageFunction: any,
        arg: any,
        options?: {
            timeout?: number
        }): Promise<R> | Promise<R> {
        return this.Element.evaluate(pageFunction, arg, options);
    }

    evaluateAll<R>(
        pageFunction: any,
        arg?: any): Promise<R> | Promise<R> {
        return this.Element.evaluateAll(pageFunction, arg);
    }

    elementHandle(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
        return this.Element.elementHandle(options);
    }

    allInnerTexts(): Promise<string[]> {
        return this.Element.allInnerTexts();
    }

    allTextContents(): Promise<string[]> {
        return this.Element.allTextContents();
    }

    boundingBox(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<{ x: number; y: number; width: number; height: number; } | null> {
        return this.Element.boundingBox(options);
    }

    check(
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            position?: { x: number; y: number; } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.check(options)
    }

    click(options?: {
        button?: "left" | "right" | "middle" | undefined;
        clickCount?: number | undefined;
        delay?: number | undefined;
        force?: boolean | undefined;
        modifiers?: ("Alt" | "Control" | "Meta" | "Shift")[] | undefined;
        noWaitAfter?: boolean | undefined;
        position?: { x: number; y: number; } | undefined;
        timeout?: number | undefined;
        trial?: boolean | undefined;
    } | undefined): Promise<void> {
        return this.Element.click(options);
    }

    count(): Promise<number> {
        return this.Element.count();
    }

    dblclick(
        options?: {
            button?: "left" | "right" | "middle" | undefined;
            delay?: number | undefined;
            force?: boolean | undefined;
            modifiers?: ("Alt" | "Control" | "Meta" | "Shift")[] | undefined;
            noWaitAfter?: boolean | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.dblclick(options);
    }

    dragTo(
        target: Locator,
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            sourcePosition?: {
                x: number;
                y: number;
            } | undefined;
            targetPosition?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.dragTo(target, options);
    }

    elementHandles(): Promise<ElementHandle<Node>[]> {
        return this.Element.elementHandles();
    }

    fill(
        value: string,
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.fill(value, options);
    }

    filter(
        options?: {
            has?: Locator | undefined;
            hasText?: string | RegExp | undefined;
        } | undefined): Locator {
        return this.filter(options);
    }

    first(): Locator {
        return this.Element.first();
    }

    focus(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.focus(options);
    }

    frameLocator(
        selector: string): FrameLocator {
        return this.Element.frameLocator(selector);
    }

    getAttribute(
        name: string,
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<string | null> {
        return this.Element.getAttribute(name, options);
    }

    highlight(): Promise<void> {
        return this.Element.highlight();
    }

    hover(
        options?: {
            force?: boolean | undefined;
            modifiers?: ("Alt" | "Control" | "Meta" | "Shift")[] | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.hover(options);
    }

    innerHTML(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<string> {
        return this.Element.innerHTML(options);
    }

    innerText(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<string> {
        return this.Element.innerText(options);
    }

    inputValue(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<string> {
        return this.inputValue(options);
    }

    isChecked(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isChecked(options);
    }

    isDisabled(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isDisabled(options);
    }

    isEditable(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isEnabled(options);
    }

    isEnabled(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isEnabled(options);
    }

    isHidden(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isHidden(options);
    }

    isVisible(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<boolean> {
        return this.Element.isVisible(options);
    }

    last(): Locator {
        return this.Element.last();
    }

    locator(
        selector: string,
        options?: {
            has?: Locator | undefined;
            hasText?: string | RegExp | undefined;
        } | undefined): Locator {
        return this.Element.locator(selector, options);
    }

    nth(index: number): Locator {
        return this.Element.nth(index);
    }

    page(): Page {
        return this.Element.page();
    }

    press(
        key: string,
        options?: {
            delay?: number | undefined;
            noWaitAfter?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.press(key, options);
    }

    screenshot(options?: LocatorScreenshotOptions | undefined): Promise<Buffer> {
        return this.Element.screenshot(options);
    }

    scrollIntoViewIfNeeded(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.scrollIntoViewIfNeeded(options);
    }

    selectOption(
        values: string | string[] | ElementHandle<Node> | ElementHandle<Node>[] | {
            value?: string | undefined;
            label?: string | undefined;
            index?: number | undefined;
        } | {
            value?: string | undefined;
            label?: string | undefined;
            index?: number | undefined;
        }[] | null,
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<string[]> {
        return this.Element.selectOption(values, options);
    }

    selectText(
        options?: {
            force?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.selectText(options);
    }

    setChecked(
        checked: boolean,
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.setChecked(checked, options);
    }

    setInputFiles(
        files: string | string[] | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        } | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        }[],
        options?: {
            noWaitAfter?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.setInputFiles(files, options);
    }

    tap(
        options?: {
            force?: boolean | undefined;
            modifiers?: ("Alt" | "Control" | "Meta" | "Shift")[] | undefined;
            noWaitAfter?: boolean | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.tap(options);
    }

    textContent(
        options?: {
            timeout?: number | undefined;
        } | undefined): Promise<string | null> {
        return this.Element.textContent(options);
    }

    type(
        text: string,
        options?: {
            delay?: number | undefined;
            noWaitAfter?: boolean | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.type(text, options);
    }

    uncheck(
        options?: {
            force?: boolean | undefined;
            noWaitAfter?: boolean | undefined;
            position?: {
                x: number;
                y: number;
            } | undefined;
            timeout?: number | undefined;
            trial?: boolean | undefined;
        } | undefined): Promise<void> {
        return this.Element.uncheck(options);
    }

    waitFor(
        options?: {
            state?: "attached" | "detached" | "visible" | "hidden" | undefined;
            timeout?: number | undefined;
        } | undefined): Promise<void> {
        return this.Element.waitFor(options);
    }

    dispatchEvent(
        type: string,
        eventInit?: any,
        options?: {
            timeout?: number;
        }): Promise<void> {
        return this.Element.dispatchEvent(type, eventInit, options);
    };

    evaluateHandle(
        pageFunction: Function | string,
        arg?: any,
        options?: {
            timeout?: number;
        }): Promise<JSHandle> {
        return this.Element.evaluateHandle(pageFunction, arg, options);
    };
}