import {driver} from '../../base/driver/Driver';
import Buttons from '../../identifiers/Buttons';
import Input from '../../identifiers/Input';
import ApplyForAJobForm from '../../identifiers/forms/ApplyForAJobForm';
import ContactUsForm from '../../identifiers/forms/ContactUsForm';
import GetInTouchForm from '../../identifiers/forms/GetInTouchForm';
import {sessionValue} from '../../runtimeVariables/SessionValue';

class FormSteps {
	public async sendContactUsMessage() {
		await driver
			.getByTestId(ContactUsForm.FullName)
			.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		await driver.getByTestId(ContactUsForm.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(ContactUsForm.Phone).fill(sessionValue.numberValue);
		await driver.getByTestId(ContactUsForm.Message).fill(`TestMessage${sessionValue.stringValue}`);

		await driver.executeFunc(async () => {
			await driver.getByTestId(Buttons.Send).click();
			await driver.getByTestId(Buttons.Close).waitFor({state: 'visible'});
		}, 5);
	}

	public async sendApplyForAJob() {
		await driver.getByTestId(ApplyForAJobForm.FirstName).fill(`Test${sessionValue.stringValue}`);
		await driver.getByTestId(ApplyForAJobForm.LastName).fill(`Automation${sessionValue.stringValue}`);
		await driver.getByTestId(ApplyForAJobForm.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(ApplyForAJobForm.Phone).fill(sessionValue.numberValue);
		await driver.getByTestId(ApplyForAJobForm.Message).fill(`TestMessage${sessionValue.stringValue}`);

		await driver.executeFunc(async () => {
			await driver.getByTestId(Buttons.Send).click();
			await driver.getByTestId(Buttons.Send).waitFor({state: 'hidden'});
		}, 5);
	}

	public async sendGetInTouchMessage() {
		this.fillGetInTouchForm();

		await driver.getByTestId(Buttons.Send).click();
		await driver.getByTestId(Buttons.Close, undefined, 1).waitFor({state: 'visible'});
	}

	public async fillGetInTouchForm() {
		if (await driver.getByTestId(GetInTouchForm.FullName).isVisible()) {
			await driver
				.getByTestId(GetInTouchForm.FullName)
				.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		} else {
			await driver.getByTestId(GetInTouchForm.FirstName).fill(`Test${sessionValue.stringValue}`);
			await driver.getByTestId(GetInTouchForm.LastName).fill(`Automation${sessionValue.stringValue}`);
		}

		await driver.getByTestId(GetInTouchForm.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(GetInTouchForm.Message).fill(`TestMessage${sessionValue.stringValue}`);
	}

	public async getErrorMessagesFromFields(necessaryFields: string[]): Promise<string[]> {
		const listOfMessages: any[] = await Promise.all(
			necessaryFields.map(async (field) => {
				const element = driver.getByTestId(field).locator(Input.FieldErrorSelector);
				if (element !== null && element !== undefined) return element.textContent();
			})
		);
		return listOfMessages;
	}
}

const formSteps = new FormSteps();

export {formSteps};
