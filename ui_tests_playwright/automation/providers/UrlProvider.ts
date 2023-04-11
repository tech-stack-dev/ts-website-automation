import {ClientsEnum} from '../base/client/ClientsEnum';
import appsetting from '../../appsetting.json';
import EnvProvider, {Environment} from './EnvProvider';
import UrlPath from './UrlPath';

export default class UrlProvider {
	public static urlBuilder(urlPath: string, urlWebSite : string = UrlProvider.webSiteUrl()) {
		return `${urlWebSite}${urlPath}`;
	}

	public static webSiteUrl(environment: Environment = EnvProvider.Environment) {
		switch (environment) {
			case Environment.Staging: {
				return appsetting.Staging;
			}
			case Environment.Production: {
				return appsetting.Production;
			}
			default: {
				throw new Error(`Unknown environment. Environment: ${UrlPath.testEnv}`);
			}
		}
	}

	public static careerUrl(environment: Environment = EnvProvider.Environment) {
		switch (environment) {
			case Environment.Staging: {
				return appsetting.StagingCareer;
			}
			case Environment.Production: {
				return appsetting.ProductionCareer;
			}
			default: {
				throw new Error(`Unknown environment. Environment: ${UrlPath.testEnv}`);
			}
		}
	}

	public static clientUrl(clientName: ClientsEnum): string {
		switch (clientName) {
			case ClientsEnum.Client_1: {
				return UrlPath.client1Url;
			}
			case ClientsEnum.Client_2: {
				return <string>process.env.CLIENT_2_URL;
			}
			case ClientsEnum.Client_3: {
				return <string>process.env.CLIENT_3_URL;
			}
			default: {
				throw Error(`Unable to generate client URL for '${clientName}' brand`);
			}
		}
	}
}
