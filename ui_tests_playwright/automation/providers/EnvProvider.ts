import UrlPath from './UrlPath';

export enum Environment {
	Staging,
	Production,
}

const QaseEnvironmentIdMapping: {[key in Environment]: number} = {
	[Environment.Staging]: 2,
	[Environment.Production]: 1,
};

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
				throw new Error(`Unknown environment. Environment: ${UrlPath.testEnv}`);
			}
		}
	}

	public static get qaseEnvironmentId(): number {
		const currentEnvironment = this.Environment;
		return QaseEnvironmentIdMapping[currentEnvironment];
	}
}
