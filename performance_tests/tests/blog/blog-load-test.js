import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getQualityEngineering, getTechStackNews, goToBlog } from '../../steps/blog-steps.js';

export let options = {
	stages: [
		{ duration: '30s', target: 100 },
		{ duration: '5m', target: 100 },
		{ duration: '30s', target: 0 },
	],
	thresholds: {
		http_req_failed: ['rate<0.01'], // http errors should be less than 1%
		http_req_duration: ['p(95)<400'], // 95% of requests should be below 400ms
	}
};

export default function () {
	sleep(randomIntBetween(1, 3));

	goToBlog();
	sleep(randomIntBetween(1, 5));

	getTechStackNews();
	sleep(randomIntBetween(1, 5));

	getQualityEngineering();
	sleep(randomIntBetween(1, 5));

	goToBlog();
	sleep(randomIntBetween(1, 5));
};