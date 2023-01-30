import BasePage from "../base/page/BasePage";

export default class MenuPage extends BasePage {
    public logo() {
        return this.page.locator("//img[@id='logo-header']");
    }

    public contactUsButton() {
        return this.page.locator("//a[@id='header-book-link']");
    }

    public menuButton() {
        return this.page.locator("//a[@id='menu-btn']");
    }

    public closeButton() {
        return this.page.locator("//div[@id='close-menu-modal-menu']")
    }

    public async clickOpenMenu() {
        await this.menuButton().click();
    }

    public async clickCloseButton() {
        await this.closeButton().click();
    }
}