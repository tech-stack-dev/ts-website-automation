import { test } from "@playwright/test";
import { userDtoVariable } from "../../runtimeVariables/dto/UserDtoVariable";
import ApiSteps from "../../steps/api/ApiSteps";
import BaseApiSteps from "../../base/step/BaseApiSteps";
import { ClientsEnum } from "../../base/client/ClientsEnum";
import RequestOptions from "../../base/client/RequestOptions";

test.beforeEach(async () => {
    await BaseApiSteps.createClient(ClientsEnum.Client_1);
});

test("Api test GET", async () => {
    await ApiSteps.executeGetRequest("/api/users?page=2")
    await ApiSteps.checkPropertyValue("page", 2);
});

test("Api test POST", async () => {
    userDtoVariable.value = {
        name: "morpheus",
        job: "leader"
    };

    let requestOptions: RequestOptions = new RequestOptions();
    requestOptions.data = userDtoVariable.value;

    await ApiSteps.executePostRequest("/api/users", requestOptions, 201);
    await ApiSteps.checkPropertyValue("name", "morpheus");
});