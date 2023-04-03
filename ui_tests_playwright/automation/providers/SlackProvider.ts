import {awsKms} from '../base/client/AWSkms';
import { slackDtoVariable } from '../runtimeVariables/dto/SlackDtoVariable';

export default class SlackProvider {
	public static async getSlackSecret() {
		const token = await awsKms.getSecret('SlackToken');
		const jsonObj = JSON.parse(token!);
		slackDtoVariable.value = {
			token: jsonObj.Token,
			stagingTechstackHrNotifyId: jsonObj.StagingTechstackHrNotifyId,
			stagingTechstackNotifyId: jsonObj.StagingTechstackNotifyId
		}
	}
}
