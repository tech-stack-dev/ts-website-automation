import {expect} from '@playwright/test';
import {client} from '../../base/client/Client';
import RequestOptions from '../../base/client/RequestOptions';
import {responseVariable} from '../../runtimeVariables/dto/ResponseVariable';

class ApiSteps {
	public async executeGetRequest(
		urlPath: string,
		requestOptions?: RequestOptions,
		statusCode = 200
	) {
		responseVariable.value = await client.get(urlPath, requestOptions);

		expect(responseVariable.value.status()).toEqual(statusCode);
	}

	public async executePostRequest(
		urlPath: string,
		requestOptions?: RequestOptions,
		statusCode = 200
	) {
		responseVariable.value = await client.post(urlPath, requestOptions);

		expect(responseVariable.value.status()).toEqual(statusCode);
	}

	public async checkPropertyValue(property: string, expectedValue: any) {
		const responseJson = await responseVariable.value.json();
		const actualValue = await responseJson[property];

		expect(actualValue).toBe(expectedValue);
	}
}

const apiSteps = new ApiSteps();

export {apiSteps};
