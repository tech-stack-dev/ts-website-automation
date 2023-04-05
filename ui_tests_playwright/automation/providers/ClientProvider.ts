import {ClientsEnum} from '../base/client/ClientsEnum';
import {client} from '../base/client/Client';
import ContextOptions from '../base/client/ContextOptions';
import appsetting from '../../appsetting.json';
import {awsKms} from '../base/client/AWSkms';

export default class ClientProvider {
	public static async getClient(clientName: ClientsEnum) {
		const context = new ContextOptions();
		switch (clientName) {
			case ClientsEnum.JiraClient: {
				const jiraSecret = await awsKms.getSecret('JiraAuthTokenBase64');
				const jAuthToken = JSON.parse(jiraSecret!).JiraAuthTokenBase64;

				context.baseURL = appsetting.JiraUrl;
				context.extraHTTPHeaders = {['Authorization']: `${jAuthToken}`};
				return await client.createClient(ClientsEnum.JiraClient, context);
			}
			case ClientsEnum.Client_1: {
				context.baseURL = appsetting.Staging;
				return await client.createClient(ClientsEnum.Client_1, context);
			}
			default: {
				throw new Error(`Unknown client. Client: '${name}'`);
			}
		}
	}
}
