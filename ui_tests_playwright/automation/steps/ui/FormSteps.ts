import {driver} from '../../base/driver/Driver';
import Buttons from '../../identifiers/Buttons';
import Input from '../../identifiers/Input';
import ApplyForAJobForm from '../../identifiers/forms/ApplyForAJobForm';
import ContactUsForm from '../../identifiers/forms/ContactUsForm';
import GetInTouchForm from '../../identifiers/forms/GetInTouchForm';
import ConnectWithOurTeamForm from '../../identifiers/forms/ConnectWithOurTeamForm';
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
		await this.fillGetInTouchForm();

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
				await element.waitFor({timeout: 15000});
				return element.textContent();
			})
		);
		return listOfMessages;
	}

	public async sendConnectWithOurTeamMessage() {
		await this.fillConnectWithOurTeamMessage();

		await driver.getByTestId(Buttons.Send).click();
		await driver.getByTestId(Buttons.Close, undefined, 1).waitFor({state: 'visible'});
	}

	public async fillConnectWithOurTeamMessage() {
		await driver
			.getByTestId(ConnectWithOurTeamForm.FullName)
			.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		await driver.getByTestId(ConnectWithOurTeamForm.Email).fill(`Test${sessionValue.stringValue}@test.com`);
		await driver.getByTestId(ConnectWithOurTeamForm.Message).fill(`TestMessage${sessionValue.stringValue}`);
		await driver.getByTestId(ConnectWithOurTeamForm.Services).fill('Cloud development');
		await driver.getByTestId(ConnectWithOurTeamForm.Platform).fill('Web');
	}
}

const formSteps = new FormSteps();

export {formSteps};
