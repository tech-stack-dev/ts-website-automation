import {driver} from '../../base/driver/Driver';
import Buttons from '../../identifiers/Buttons';
import Input from '../../identifiers/Input';
import {sessionValue} from '../../runtimeVariables/SessionValue';

class FormSteps {
	public async sendContactUsMessage() {
		await driver
			.getByTestId(Input.FullName)
			.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		await driver.getByTestId(Input.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(Input.PhoneNumber).fill(sessionValue.numberValue);
		await driver.getByTestId(Input.Message).fill(`TestMessage${sessionValue.stringValue}`);

		await driver.executeFunc(async () => {
			await driver.getByTestId(Buttons.Send).click();
			const successModal = driver.locator('//div[@id="modal"]')
			await successModal.getByTestId(Buttons.Close).waitFor({state: 'visible'});
		}, 5);
	}

	public async sendApplyForAJob() {
		await driver.getByTestId(Input.FirstName).fill(`Test${sessionValue.stringValue}`);
		await driver.getByTestId(Input.LastName).fill(`Automation${sessionValue.stringValue}`);
		await driver.getByTestId(Input.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(Input.PhoneNumber).fill(sessionValue.numberValue);
		await driver.getByTestId(Input.Message).fill(`TestMessage${sessionValue.stringValue}`);

		await driver.executeFunc(async () => {
			await driver.getByTestId(Buttons.Send).click();
			await driver.getByTestId(Buttons.Send).waitFor({state: 'hidden'});
		}, 5);
	}

	public async sendGetInTouchMessage() {
		await this.fillGetInTouchForm();

		await driver.getByTestId(Buttons.Send).click();
		await driver.getByTestId(Buttons.Close, undefined, 1).waitFor({state: 'visible'});
	}

	public async fillGetInTouchForm() {
		if (await driver.getByTestId(Input.FullName).isVisible()) {
			await driver
				.getByTestId(Input.FullName)
				.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		} else {
			await driver.getByTestId(Input.FirstName).fill(`Test${sessionValue.stringValue}`);
			await driver.getByTestId(Input.LastName).fill(`Automation${sessionValue.stringValue}`);
		}

		await driver.getByTestId(Input.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(Input.Message).fill(`TestMessage${sessionValue.stringValue}`);
	}

	public async getErrorMessagesFromFields(necessaryFields: string[]): Promise<string[]> {
		const listOfMessages: any[] = await Promise.all(
			necessaryFields.map(async (field) => {
				const element = driver.getByTestId(field).locator(Input.FieldErrorSelector);
				await element.waitFor({timeout: 15000});
				return element.textContent();
			})
		);
		return listOfMessages;
	}
}

const formSteps = new FormSteps();

export {formSteps};
