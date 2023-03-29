import {SecretsManager} from 'aws-sdk';

class AWSkms {
	private async createKmsClient() {
		process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
		if (
			(process.env.AWS_KEY === undefined,
			process.env.AWS_PASSWORD === undefined)
		) {
			console.error('AWS credentionals were not found, check your .env file');
		}

		const secretsManager = new SecretsManager({
			region: 'eu-central-1',
			accessKeyId: process.env.AWS_KEY,
			secretAccessKey: process.env.AWS_PASSWORD,
		});
		return secretsManager;
	}

	public async getSecret(secretName: string) {
		const client = await this.createKmsClient();
		const secret = (
			await client.getSecretValue({SecretId: secretName}).promise()
		).SecretString;
		return secret;
	}
}

const awsKms = new AWSkms();

export {awsKms};
