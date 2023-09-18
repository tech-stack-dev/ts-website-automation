import BasePage from "../base/page/BasePage";

export default class GetInTouchPage extends BasePage {
	public fileInput() {
		return this.page.locator('//label[@id="fileLabel"]');
	}

	public removeFileButton() {
		return this.page.locator('//div[@class="attached-file-button"]');
	}
}