import UrlPath from "./UrlPath";

export enum Environment {
	Staging,
	Production,
}

export default class EnvProvider {
	public static get Environment(): Environment {
		switch (UrlPath.testEnv) {
			case 'staging': {
				return Environment.Staging;
			}
			case 'production': {
				return Environment.Production;
			}
			default: {
				throw new Error(
					`Unknown environment. Environment: ${UrlPath.testEnv}`
				);
			}
		}
	}
}
