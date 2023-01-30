import { ClientsEnum } from "../base/client/ClientsEnum";

export default class UrlProvider {
    public static webSiteUrl(): string {
        return <string>process.env.WEB_SITE_URL;
    }

    public static clientUrl(clientName: ClientsEnum): string {
        switch (clientName) {
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_1_URL;
            }
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_2_URL;
            }
            case ClientsEnum.Client_1: {
                return <string>process.env.CLIENT_3_URL;
            }
            default: {
                throw Error(`Unable to generate client URL for '${clientName}' brand`)
            }
        }
    }
}