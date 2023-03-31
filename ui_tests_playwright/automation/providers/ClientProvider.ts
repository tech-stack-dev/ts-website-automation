import { ClientsEnum } from "../base/client/ClientsEnum";
import {client} from '../base/client/Client';
import UrlPath from "./UrlPath";
import ContextOptions from "../base/client/ContextOptions";
import BaseClient from "../base/client/BaseClient";
import appsetting from '../../appsetting.json';


export default class ClientProvider {
	public static async getClient(clientName:ClientsEnum){
		const context = new ContextOptions();
		switch (clientName) {
			case ClientsEnum.JiraClient: {
				context.baseURL = appsetting.JiraUrl;
				context.extraHTTPHeaders =  {['Authorization']: `${appsetting.JiraAuthToken}`};
				return await client.createClient(ClientsEnum.JiraClient, context);
			}
			// case ClientsEnum.Client_1: {
			// 	return ClientsEnum.Client_1;
			// }
			default: {
				throw new Error(
					`Unknown client. Client: '${name}'`
				);
			}
		}
	}
}
