import {driver} from '../../base/driver/Driver';
import {FormDto, validGetInTouchData} from '../../dto/FormDto';
import Buttons from '../../identifiers/Buttons';
import Input from '../../identifiers/Input';
import GeneralContainersMainSite from '../../identifiers/mainSite/GeneralContainersMainSite';
import ContactUs from '../../identifiers/mainSite/pages/contactUs/ContactUs';
import Modal from '../../identifiers/Modal';
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
			const successModal = driver.getByTestId(Modal.ApplyForAJob);
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

	public async sendGetOurRateCardMessage() {
		this.fillGetOurRateCard(`Test${sessionValue.stringValue}@test.com`);
		await driver.Page.waitForTimeout(5000);
		await driver.getByTestId(Buttons.Download).first().click();
	}

	public async fillGetOurRateCard(email: string) {
		await driver.Page.waitForLoadState();
		await driver.getByTestId(Input.Email).first().fill(email);
	}

	public async sendGetInTouchMessage() {
		await this.fillGetInTouchForm(validGetInTouchData);
		await driver.getByTestId(Buttons.Send).click();
		await driver.getByTestId(Modal.Success).getByTestId(Buttons.Close).waitFor({state: 'visible'});
	}

	public async fillGetInTouchForm(formDto: FormDto) {
		if (await driver.getByTestId(Input.FullName).isVisible()) {
			await driver
				.getByTestId(Input.FullName)
				.fill(`Test${sessionValue.stringValue} Automation${sessionValue.stringValue}`);
		} else {
			await driver.getByTestId(Input.FirstName).fill(formDto.firstName);
			await driver.getByTestId(Input.LastName).fill(formDto.lastName);
		}
		const formLocator = (await driver.getByTestId(GeneralContainersMainSite.GetInTouch).isVisible())
			? driver.getByTestId(GeneralContainersMainSite.GetInTouch)
			: driver.getByTestId(ContactUs.ContactUsForm);
		await formLocator.getByTestId(Input.Email).fill(formDto.email);
		if (formDto.request) {
			await driver.getByTestId(Input.Message).fill(formDto.request);
		}
	}

	public async getErrorMessagesFromFieldsCareer(necessaryFields: string[]): Promise<string[]> {
		const listOfMessages: any[] = await Promise.all(
			necessaryFields.map(async (field) => {
				const element = driver.getByTestId(field).locator(Input.FieldErrorSelectorCareer);
				await element.waitFor({timeout: 15000});
				return element.textContent();
			})
		);
		return listOfMessages;
	}
}

const formSteps = new FormSteps();

export {formSteps};
