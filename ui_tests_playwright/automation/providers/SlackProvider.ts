import { awsKms } from "../base/client/AWSkms";

export default class SlackProvider {
    public static async getSlackToken() {
        const token = await awsKms.getSecret('SlackToken');
        const jsonObj = JSON.parse(token!);
        
        return jsonObj['Token'];
    }
}