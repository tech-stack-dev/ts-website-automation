import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import Button from '../../identifiers/Button';
import Input from '../../identifiers/Input';
import ContactUsForm from '../../identifiers/forms/ContactUsForm';

class ContactUsSteps {
	public async getErrorMessagesFromFields(necessaryFields: string[]): Promise<string[]> {
		const listOfMessages: any[] = await Promise.all(
			necessaryFields.map(async (field) => {
				const element = driver.getByTestId(field).locator(Input.FieldErrorSelector);
				if (element !== null && element !== undefined) return element.textContent();
			})
		);
		return listOfMessages;
	}

	public async sendDataToFieldsAndCheckErrorMessages(
		email: string,
		phone: string,
		testData: Record<string, string>
	): Promise<boolean> {
		await driver.getByTestId(ContactUsForm.Email).fill(email);
		await driver.getByTestId(ContactUsForm.Phone).fill(phone);
		await driver.getByTestId(Button.SendButton).click();

		const listOfMessages = await contactUsSteps.getErrorMessagesFromFields([
			ContactUsForm.Email,
			ContactUsForm.Phone,
		]);

		return Object.values(testData).every((message) => listOfMessages.includes(message));
	}

	public async attachFileToContactUsForm(filePath: string) {
		const fileInput = driver.locator("//input[@type = 'file']");
		await fileInput.setInputFiles(filePath);
	}

	public async checkFileAttachErrorMessage(expectedMessage: string) {
		const errorMessage = await driver.locator("//div[@class='invalid files']").textContent();
		expect(expectedMessage).toBe(errorMessage);
	}

	public async checkSuccessModalMessage(expectedMessage: string) {
		const modalMessage = await driver.locator("//div[contains(@class,'MessageWrapper')]/div/span").textContent();
		expect(modalMessage).toBe(expectedMessage);
	}
}

const contactUsSteps = new ContactUsSteps();
export {contactUsSteps};
