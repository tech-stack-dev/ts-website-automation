import {Message} from '@slack/web-api/dist/response/ConversationsHistoryResponse';
import {WebClient} from '@slack/web-api';
import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import {slackDtoVariable} from '../../runtimeVariables/dto/SlackDtoVariable';
import {FormDto} from '../../dto/FormDto';

class SlackSteps {
	public async getMessageWithValueFromChat(chatId: string, value: string): Promise<Message> {
		let message: Message | undefined;

		await driver.executeFunc(async () => {
			const webClient = new WebClient(slackDtoVariable.value.token);
			const messages: Message[] = (await webClient.conversations.history({channel: chatId})).messages!;
			message = messages.find((x) =>
				x.attachments!.find((x) => x.fields!.find((x) => x.value?.toLowerCase() === value.toLowerCase()))
			);
			expect(message).not.toBe(undefined);
		}, 5);

		return message!;
	}

	public checkMessageFromHrNotifyChannel(
		actualMessage: Message,
		expectedMessage: {
			name: string;
			lastName: string;
			email: string;
			tel: string;
			message: string;
		}
	) {
		const fields = actualMessage.attachments![0].fields;

		expect(fields?.find((x) => x.title === 'first Name')?.value).toBe(expectedMessage.name);
		expect(fields?.find((x) => x.title === 'last Name')?.value).toBe(expectedMessage.lastName);
		expect(fields?.find((x) => x.title === 'Email')?.value).toContain(expectedMessage.email);
		expect(fields?.find((x) => x.title === 'PhoneNumber')?.value).toBe(expectedMessage.tel);
		expect(fields?.find((x) => x.title === 'Message')?.value).toBe(expectedMessage.message);
	}

	public checkMessageFromNotifyChannel(actualMessage: Message, expectedMessage: FormDto) {
		const fields = actualMessage.attachments![0].fields;

		const firstNameField = fields?.find((x) => x.title === 'FirstName');
		if (firstNameField) expect(firstNameField.value).toBe(expectedMessage.firstName);
		const lastNameField = fields?.find((x) => x.title === 'LastName');
		if (lastNameField) {
			expect(lastNameField.value).toBe(expectedMessage.lastName);
		}

		expect(fields?.find((x) => x.title === 'Email')?.value?.toLowerCase()).toContain(expectedMessage.email);
		const messageField = fields?.find((x) => x.title === 'Message');
		if (messageField) {
			expect(messageField.value).toBe(expectedMessage.request);
		}
	}

	public async postMessageInSlackChannel(chatId: string, value: string) {
		const webClient = new WebClient(slackDtoVariable.value.token);
		const response = await webClient.chat.postMessage({channel: chatId, text: value});

		expect(response.ok).toBe(true);
	}
}

const slackSteps = new SlackSteps();
export {slackSteps};
