import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import Buttons from '../../identifiers/Buttons';
import ContactUsPage from '../../pages/careerSite/ContactUsPage';
import {formSteps} from '../ui/FormSteps';
import Input from '../../identifiers/Input';

class ContactUsSteps {
	public async sendDataToFieldsAndCheckErrorMessages(
		email: string,
		phone: string,
		testData: Record<string, string>
	): Promise<boolean> {
		await driver.getByTestId(Input.Email).fill(email);
		await driver.getByTestId(Input.PhoneNumber).fill(phone);
		await driver.getByTestId(Buttons.Send).click();

		const listOfMessages = await formSteps.getErrorMessagesFromFields([Input.Email, Input.PhoneNumber]);

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
