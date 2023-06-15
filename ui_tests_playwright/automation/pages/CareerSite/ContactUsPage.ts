import BasePage from '../../base/page/BasePage';

export default class ContactUsPage extends BasePage {
	public fileInput() {
		return this.page.locator("//input[@type = 'file']");
	}

	public fileAttachError() {
		return this.page.locator("//div[@class='invalid files']");
	}

	public successModalMessage() {
		return this.page.locator("//div[contains(@class,'MessageWrapper')]/div/span");
	}
}
