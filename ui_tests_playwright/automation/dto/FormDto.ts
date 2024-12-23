import {sessionValue} from '../runtimeVariables/SessionValue';

export interface FormDto {
	firstName: string;
	lastName: string;
	email: string;
	request?: string;
}

export const validGetInTouchData: FormDto = {
	email: `test${sessionValue.stringValue}@test.com`,
	firstName: `TestMessage${sessionValue.stringValue}`,
	lastName: `Automation${sessionValue.stringValue}`,
	request: `TestMessage${sessionValue.stringValue}`,
};

export const invalidGetInTouchData: FormDto[] = [
	{
		email: '',
		firstName: '',
		lastName: '',
	},
	{
		email: `Test${sessionValue.stringValue}`,
		firstName: 'ab',
		lastName: 'ab',
	},
	{
		email: `Test${sessionValue.stringValue}@testcom`,
		firstName: '    ',
		lastName: '    ',
	},
	{
		email: `@Test${sessionValue.stringValue}.com`,
		firstName: 'a',
		lastName: 'a',
	},
	{
		email: `Test ${sessionValue.stringValue}@test.com`,
		firstName: 'a a',
		lastName: 'a a',
	},
];
