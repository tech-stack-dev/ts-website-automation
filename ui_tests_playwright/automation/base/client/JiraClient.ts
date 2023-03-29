import appsetting from '../../../appsetting.json';
import JiraApi from 'jira-client';
import UrlProvider from '../../providers/UrlProvider';
import BaseClient from './BaseClient';
import {ClientsEnum} from './ClientsEnum';
import ContextOptions from './ContextOptions';

class JiraClient {
	private static JClient: JiraApi;

	static getClient(){
		return new JiraApi({
				protocol: 'https',
				host: appsetting.Host,
				username: appsetting.Username,
				password: appsetting.Password,
				apiVersion: '2',
				strictSSL: true
		  });
	}
}

const jiraClient = new JiraClient();

export {JiraClient};
