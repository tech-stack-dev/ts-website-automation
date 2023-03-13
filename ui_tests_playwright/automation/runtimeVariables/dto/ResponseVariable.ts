import {APIResponse} from 'playwright-core';

class ResponseVariable {
	public value: APIResponse;
}

const responseVariable = new ResponseVariable();

export {responseVariable};
