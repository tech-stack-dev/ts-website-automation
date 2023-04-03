import { driver } from '../../base/driver/Driver';
import Button from '../../identifiers/Button';
import ApplyForAJobForm from '../../identifiers/Forms/ApplyForAJobForm';
import ContactUsForm from '../../identifiers/Forms/ContactUsForm';
import GetInTouchForm from '../../identifiers/Forms/GetInTouchForm';
import { sessionValue } from '../../runtimeVariables/SessionValue';

class FormSteps {
	public async sendContactUsMessage() {
		await driver
			.getByTestId(ContactUsForm.FullName)
			.fill(
				`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`
			);
		await driver
			.getByTestId(ContactUsForm.Email)
			.fill(`Test${sessionValue.stringValue}@test.com`);
		await driver
			.getByTestId(ContactUsForm.Phone)
			.fill(sessionValue.numberValue);
		await driver
			.getByTestId(ContactUsForm.Message)
			.fill(`TestMessage${sessionValue.stringValue}`);

		await driver.executeFunc(async () => {
			await driver.getByTestId(Button.SendButton).click();
			await driver.getByTestId(Button.Close).waitFor({ state: 'visible' });
		}, 5);
	}

	public async sendApplyForAJob() {
		await driver
			.getByTestId(ApplyForAJobForm.FirstName)
			.fill(`Test${sessionValue.stringValue}`);
		await driver
			.getByTestId(ApplyForAJobForm.LastName)
			.fill(`Automation${sessionValue.stringValue}`);
		await driver
			.getByTestId(ApplyForAJobForm.Email)
			.fill(`Test${sessionValue.stringValue}@test.com`);
		await driver
			.getByTestId(ApplyForAJobForm.Phone)
			.fill(sessionValue.numberValue);
		await driver
			.getByTestId(ApplyForAJobForm.Message)
			.fill(`TestMessage${sessionValue.stringValue}`);


		await driver.executeFunc(async () => {
			await driver.getByTestId(Button.SendButton).click();
			await driver.getByTestId(Button.SendButton).waitFor({ state: 'hidden' });
		}, 5);
	}

	public async sendGetInTouchMessage() {
		if (await driver.getByTestId(GetInTouchForm.FullName).isVisible()) {
			await driver
				.getByTestId(GetInTouchForm.FullName)
				.fill(
					`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`
				);
		} else {
			await driver
				.getByTestId(GetInTouchForm.FirstName)
				.fill(`Test${sessionValue.stringValue}`);
			await driver
				.getByTestId(GetInTouchForm.LastName)
				.fill(`Automation${sessionValue.stringValue}`);
		}

		await driver
			.getByTestId(GetInTouchForm.Email)
			.fill(`Test${sessionValue.stringValue}@test.com`);
		await driver
			.getByTestId(GetInTouchForm.Message)
			.fill(`TestMessage${sessionValue.stringValue}`);

		await driver.getByTestId(Button.SendButton).click();
		await driver
			.getByTestId(Button.Close, undefined, 1)
			.waitFor({ state: 'visible' });
	}
}

const formSteps = new FormSteps();

export { formSteps };
