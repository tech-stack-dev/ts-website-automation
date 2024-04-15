import {test} from '@playwright/test';
import {userDtoVariable} from '../../runtimeVariables/dto/UserDtoVariable';
import {ClientsEnum} from '../../base/client/ClientsEnum';
import RequestOptions from '../../base/client/RequestOptions';
import {apiSteps} from '../../steps/api/ApiSteps';
import {baseApiSteps} from '../../base/step/BaseApiSteps';
import {qase} from 'playwright-qase-reporter/dist/playwright';

test.beforeEach(async () => {
	await baseApiSteps.createClient(ClientsEnum.Client_1);
});

test(qase(4742, 'Api test GET @desktop'), async () => {
	await apiSteps.executeGetRequest('/api/users?page=2');
	await apiSteps.checkPropertyValue('page', 2);
});

test(qase(4743, 'Api test POST @desktop'), async () => {
	userDtoVariable.value = {
		name: 'morpheus',
		job: 'leader',
	};

	const requestOptions: RequestOptions = new RequestOptions();
	requestOptions.data = userDtoVariable.value;

	await apiSteps.executePostRequest('/api/users', requestOptions, 201);
	await apiSteps.checkPropertyValue('name', 'morpheus');
});
