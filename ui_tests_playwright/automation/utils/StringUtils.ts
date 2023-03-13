import {sessionRandomValue} from '../runtimeVariables/dto/SessionRandomValue';

class StringUtils {
	public addSessionRandom(str: string) {
		return str.replace('{SRND}', sessionRandomValue.value);
	}
}

const stringUtils = new StringUtils();
export {stringUtils};
