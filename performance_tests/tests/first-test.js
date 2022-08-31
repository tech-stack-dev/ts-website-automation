import http from 'k6/http';
import { sleep } from 'k6';
import { URL_PROVIDER } from '../providers/url-provider.js';
import { getBack, getToAboutUs, getToCareer, getToContactUs, getToReviews } from '../steps/career-steps.js';

export let options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	vus: 800,
	duration: '60s'
};

export default function () {
	http.get(URL_PROVIDER.webApp);

	getToCareer("back-end-engineer-new-v6");
	getBack();

	getToCareer("ios-software-developers-v10");

	getToContactUs();

	getToAboutUs();

	getToReviews();

	sleep(1);
};