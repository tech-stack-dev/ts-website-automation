import { Message } from '@slack/web-api/dist/response/ConversationsHistoryResponse';
import { WebClient } from '@slack/web-api';
import { expect } from '@playwright/test';
import { driver } from '../../base/driver/Driver';

class SlackSteps {
    private token: string = process.env.SLACK_TOKEN!;

    public async getMessageWithValueFromChat(chatId: string, value: string): Promise<Message> {
        // Message waiting
        await driver.Page.waitForTimeout(1000);

        let webClient = new WebClient(this.token);
        let messages: Message[] = (await webClient.conversations.history({ channel: chatId })).messages!;

        return messages.find(x => x.attachments!.find(x => x.fields!.find(x => x.value === value)))!;
    }

    public checkMessageFromHrNotifyChannel(actualMessage: Message, expectedMessage: {
        name: string;
        lastName: string;
        email: string;
        tel: string;
        messge: string
    }) {
        let fields = actualMessage.attachments![0].fields;

        expect(fields?.find(x => x.title === 'Name')?.value).toBe(expectedMessage.name);
        expect(fields?.find(x => x.title === 'last Name')?.value).toBe(expectedMessage.lastName);
        expect(fields?.find(x => x.title === 'Email')?.value).toContain(expectedMessage.email);
        expect(fields?.find(x => x.title === 'Tel')?.value).toBe(expectedMessage.tel);
        expect(fields?.find(x => x.title === 'Message')?.value).toBe(expectedMessage.messge);
    }

    public checkMessageFromNotifyChannel(actualMessage: Message, expectedMessage: {
        fullName?: string;
        firstName?: string;
        lastName?: string;
        email: string;
        messge: string
    }) {
        let fields = actualMessage.attachments![0].fields;

        if(expectedMessage.fullName){
            expect(fields?.find(x => x.title === 'FullName')?.value).toBe(expectedMessage.fullName);
        }
        else{
            expect(fields?.find(x => x.title === 'FirstName')?.value).toBe(expectedMessage.firstName);
            expect(fields?.find(x => x.title === 'LastName')?.value).toBe(expectedMessage.lastName);
        }
        
        expect(fields?.find(x => x.title === 'Email')?.value).toContain(expectedMessage.email);
        expect(fields?.find(x => x.title === 'Message')?.value).toBe(expectedMessage.messge);
    }
}

const slackSteps = new SlackSteps();

export { slackSteps };