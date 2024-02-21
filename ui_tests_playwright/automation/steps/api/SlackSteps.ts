import {Message} from '@slack/web-api/dist/response/ConversationsHistoryResponse';
import {WebClient} from '@slack/web-api';
import {expect} from '@playwright/test';
import {driver} from '../../base/driver/Driver';
import {slackDtoVariable} from '../../runtimeVariables/dto/SlackDtoVariable';

class SlackSteps {
	public async getMessageWithValueFromChat(chatId: string, value: string): Promise<Message> {
		let message: Message | undefined;

		await driver.executeFunc(async () => {
			const webClient = new WebClient(slackDtoVariable.value.token);
			const messages: Message[] = (await webClient.conversations.history({channel: chatId})).messages!;
			message = messages.find((x) => x.attachments!.find((x) => x.fields!.find((x) => x.value === value)));
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

	public checkMessageFromNotifyChannel(
		actualMessage: Message,
		expectedMessage: {
			fullName?: string;
			firstName?: string;
			lastName?: string;
			email: string;
			message: string;
		}
	) {
		const fields = actualMessage.attachments![0].fields;

		if (expectedMessage.fullName) {
			expect(fields?.find((x) => x.title === 'FullName')?.value).toBe(expectedMessage.fullName);
		} else {
			expect(fields?.find((x) => x.title === 'FirstName')?.value).toBe(expectedMessage.firstName);
			expect(fields?.find((x) => x.title === 'LastName')?.value).toBe(expectedMessage.lastName);
		}

		expect(fields?.find((x) => x.title === 'Email')?.value).toContain(expectedMessage.email);
		expect(fields?.find((x) => x.title === 'Message')?.value).toBe(expectedMessage.message);
	}

	public async postMessageInSlackChannel(chatId: string, value: string) {
		const webClient = new WebClient(slackDtoVariable.value.token);
		const response = await webClient.chat.postMessage({channel: chatId, text: value});

		expect(response.ok).toBe(true);
	}
}

const slackSteps = new SlackSteps();
export {slackSteps};
