import {test} from '@playwright/test';
import {userDtoVariable} from '../../runtimeVariables/dto/UserDtoVariable';
import {ClientsEnum} from '../../base/client/ClientsEnum';
import RequestOptions from '../../base/client/RequestOptions';
import {apiSteps} from '../../steps/api/ApiSteps';
import {baseApiSteps} from '../../base/step/BaseApiSteps';

test.beforeEach(async () => {
	await baseApiSteps.createClient(ClientsEnum.Client_1);
});

test('Api test GET', async () => {
	await apiSteps.executeGetRequest('/api/users?page=2');
	await apiSteps.checkPropertyValue('page', 2);
});

test('Api test POST', async () => {
	userDtoVariable.value = {
		name: 'morpheus',
		job: 'leader',
	};

	let requestOptions: RequestOptions = new RequestOptions();
	requestOptions.data = userDtoVariable.value;

	await apiSteps.executePostRequest('/api/users', requestOptions, 201);
	await apiSteps.checkPropertyValue('name', 'morpheus');
});
