import { test } from "@playwright/test";
import { userDtoVariable } from "../../runtimeVariables/dto/UserDtoVariable";
import ApiSteps from "../../steps/api/ApiSteps";
import BaseApiSteps from "../../base/step/BaseApiSteps";
import { ClientsEnum } from "../../base/client/ClientsEnum";
import RequestOptions from "../../base/client/RequestOptions";

let apiSteps: ApiSteps = new ApiSteps();

test.beforeEach(async () => {
    await new BaseApiSteps().createClient(ClientsEnum.Client_1);
});

test("Api test GET", async () => {
    await apiSteps.executeGetRequest("/api/users?page=2")
    await apiSteps.checkPropertyValue("page", 2);
});

test("Api test POST", async () => {
    userDtoVariable.value = {
        name: "morpheus",
        job: "leader"
    };

    let requestOptions: RequestOptions = new RequestOptions();
    requestOptions.data = userDtoVariable.value;

    await apiSteps.executePostRequest("/api/users", requestOptions, 201);
    await apiSteps.checkPropertyValue("name", "morpheus");
});