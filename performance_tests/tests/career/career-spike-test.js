import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getToWebsite } from '../../steps/career-steps.js';

export let options = {
    stages: [
		{ duration: '2m', target: 1500 },
		{ duration: '1m', target: 0 },
	  ],
	thresholds: {
		http_req_failed: ['rate<0.01'], // http errors should be less than 1%
		http_req_duration: ['p(95)<400'], // 95% of requests should be below 400ms
	}
};

export default function () {
	getToWebsite();
	sleep(randomIntBetween(1, 3));
};