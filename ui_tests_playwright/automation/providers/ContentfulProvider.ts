import {awsKms} from '../base/client/AWSkms';
import {ContentfulSecretEnum} from '../enum/contentfulEnums/ContentfulSecretEnum';
import {contentfulDtoVariable} from '../runtimeVariables/dto/ContentfulDtoVariable';

export default class ContentfulProvider {
	static contentfulData = this.getContentfulSecret();

	static async getContentfulSecret(secrectName: ContentfulSecretEnum = ContentfulSecretEnum.CareerSecret) {
		const contentfulDto = contentfulDtoVariable;
		const secretString = await awsKms.getSecret(secrectName);
		const jsonObj = JSON.parse(secretString!);
		contentfulDto.value = {
			contentfulAccessToken: jsonObj.contentfulAccessToken,
			contentfulEnv: jsonObj.contentfulEnv,
			contentfulSpaceId: jsonObj.contentfulSpaceId,
		};
		return contentfulDto;
	}

	public static async SpaceId(): Promise<string> {
		return (await this.contentfulData).value.contentfulSpaceId;
	}

	public static async AccessToken(): Promise<string> {
		return (await this.contentfulData).value.contentfulAccessToken;
	}

	public static async Env(): Promise<string> {
		return (await this.contentfulData).value.contentfulEnv;
	}
}
