import { APIResponse } from "playwright-core";

class ResponseVariable {
    public value: APIResponse;
}

var responseVariable = new ResponseVariable();

export { responseVariable };