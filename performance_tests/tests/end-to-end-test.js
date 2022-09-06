import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { getBack, getBuildId, getToAboutUs, getToCareer, getToContactUs, getToReviews, getToWebsite } from '../steps/career-steps.js';

export let options = {
	thresholds: {
		http_req_failed: ['rate<0.01'], // http errors should be less than 1%
		http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
	},
	stages: [
		{ duration: '20s', target: 15 },
		{ duration: '20s', target: 30 },
		{ duration: '2m', target: 50 },
		{ duration: '30s', target: 0 },
	  ],
	insecureSkipTLSVerify: true,
	noConnectionReuse: false
};

export function setup() {
	const buildId = getBuildId();
	return { buildId: buildId }
  }

export default function (data) {
	sleep(randomIntBetween(1, 3));
	getToWebsite();
	sleep(randomIntBetween(1, 5));

	getToCareer('back-end-engineer-new-v6', 'Back-End Engineer new', data.buildId);
	sleep(randomIntBetween(1, 5));

	getBack(data.buildId);
	sleep(randomIntBetween(1, 5));

	getToCareer('ios-software-developers-v10', 'iOS Software Developer', data.buildId);
	sleep(randomIntBetween(1, 5));

	getToContactUs(data.buildId);
	sleep(randomIntBetween(1, 5));

	getToAboutUs(data.buildId);
	sleep(randomIntBetween(1, 5));

	getToReviews(data.buildId);
	sleep(randomIntBetween(1, 3));
};