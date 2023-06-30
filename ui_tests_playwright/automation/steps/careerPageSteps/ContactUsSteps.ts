import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import Button from '../../identifiers/Button';
import ContactUsForm from '../../identifiers/forms/ContactUsForm';
import ContactUsPage from '../../pages/CareerSite/ContactUsPage';
import {formSteps} from '../ui/FormSteps';

class ContactUsSteps {
	public async sendDataToFieldsAndCheckErrorMessages(
		email: string,
		phone: string,
		testData: Record<string, string>
	): Promise<boolean> {
		await driver.getByTestId(ContactUsForm.Email).fill(email);
		await driver.getByTestId(ContactUsForm.Phone).fill(phone);
		await driver.getByTestId(Button.SendButton).click();

		const listOfMessages = await formSteps.getErrorMessagesFromFields([ContactUsForm.Email, ContactUsForm.Phone]);

		return Object.values(testData).every((message) => listOfMessages.includes(message));
	}

	public async attachFileToContactUsForm(filePath: string) {
		const page = driver.getPage(ContactUsPage);
		const fileInput = (await page).fileInput();
		await fileInput.setInputFiles(filePath);
	}

	public async checkFileAttachErrorMessage(expectedMessage: string) {
		const page = driver.getPage(ContactUsPage);
		const errorMessage = await (await page).fileAttachError().textContent();
		expect(expectedMessage).toBe(errorMessage);
	}

	public async checkSuccessModalMessage(expectedMessage: string) {
		const page = driver.getPage(ContactUsPage);
		const modalMessage = await (await page).successModalMessage().textContent();
		expect(modalMessage).toBe(expectedMessage);
	}
}

const contactUsSteps = new ContactUsSteps();
export {contactUsSteps};
