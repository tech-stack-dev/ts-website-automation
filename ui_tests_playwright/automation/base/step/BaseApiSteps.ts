import {client} from '../../base/client/Client';
import {ClientsEnum} from '../client/ClientsEnum';
import ContextOptions from '../client/ContextOptions';

class BaseApiSteps {
	public async createClient(
		clientName: ClientsEnum = ClientsEnum.Client_1,
		contextOption: ContextOptions = {}
	) {
		await client.createClient(clientName, contextOption);
	}

	public async switchToClient(clientName: ClientsEnum) {
		client.focusedClient = client.listOfClients.find(
			(x) => x.ClientName === clientName
		)!;
	}
}

const baseApiSteps = new BaseApiSteps();

export {baseApiSteps};
