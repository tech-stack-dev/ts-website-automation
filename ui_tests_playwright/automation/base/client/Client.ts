import { request } from "@playwright/test";
import UrlProvider from "../../providers/UrlProvider";
import BaseClient from "./BaseClient";
import { ClientsEnum } from "./ClientsEnum";
import ContextOptions from "./ContextOptions";

class Client extends BaseClient {
    public focusedClient: BaseClient;
    public listOfClients: BaseClient[] = [];

    public async createClient(clientName: ClientsEnum, contextOptions: ContextOptions) {
        contextOptions.baseURL = UrlProvider.clientUrl(clientName);
        client.focusedClient = new BaseClient();
        client.focusedClient.ClientName = clientName;
        client.ClientContext = await request.newContext(contextOptions);
        client.listOfClients.push(client.focusedClient);

        return this;
    }
}

var client = new Client();

export { client };