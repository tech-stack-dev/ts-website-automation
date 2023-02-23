import { expect } from "@playwright/test";
import { client } from "../../base/client/Client";
import RequestOptions from "../../base/client/RequestOptions";
import { responseVariable } from "../../runtimeVariables/dto/ResponseVariable";

export default class ApiSteps {
    public static async executeGetRequest(urlPath: string, requestOptions?: RequestOptions, statusCode: number = 200) {
        responseVariable.value = await client.get(urlPath, requestOptions);

        expect(responseVariable.value.status()).toEqual(statusCode);
    }

    public static async executePostRequest(urlPath: string, requestOptions?: RequestOptions, statusCode: number = 200) {
        responseVariable.value = await client.post(urlPath, requestOptions);

        expect(responseVariable.value.status()).toEqual(statusCode);
    }

    public static async checkPropertyValue(property: string, expectedValue: any) {
        let responseJson = await responseVariable.value.json();
        let actualValue = await responseJson[property];

        expect(actualValue).toBe(expectedValue);
    }
}