import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getQualityEngineering, getTechStackNews, goToBlog } from '../../steps/blog-steps.js';
import { buildTestConfigs } from "../../providers/scenario-provider.js"
import { TEST_TYPE, BUSINESS_VALUE, EXEC } from '../../configs/testType.js';

if (!EXEC) throw new Error('Missing required EXEC name');
if (!BUSINESS_VALUE || isNaN(BUSINESS_VALUE)) throw new Error('Missing or invalid BV');

export const options = buildTestConfigs(BUSINESS_VALUE, EXEC, TEST_TYPE);

export function blogFlow() {
	sleep(randomIntBetween(1, 3));

	goToBlog();
	sleep(randomIntBetween(1, 5));

	getTechStackNews();
	sleep(randomIntBetween(1, 5));

	getQualityEngineering();
	sleep(randomIntBetween(1, 5));

	goToBlog();
	sleep(randomIntBetween(1, 5));
}