import {awsKms} from '../base/client/AWSkms';

class QaseAwsSecret {
    public static async getQaseApiToken(): Promise<string | undefined> {
        return await awsKms.getSecret('QaseApiToken');
    }
}

export { QaseAwsSecret };
