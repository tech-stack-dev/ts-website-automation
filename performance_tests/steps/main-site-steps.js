import { check } from 'k6';
import http from 'k6/http';
import { BASE_URL_PROVIDER, URL_PROVIDER } from '../providers/url-provider.js';

export function getToMainSite() {
    let response = http.get(BASE_URL_PROVIDER.mainSiteUrl());

    check(response, {
        'is status 200 - Home page': (r) => r.status === 200,
        'Home page check': (r) => r.body.includes('Make\nan impact')
    });
}

export function getToQaServise() {
    let response = http.get(URL_PROVIDER.qaServise);

    check(response, {
        'is status 200 - QA as a Service page': (r) => r.status === 200,
        'QA as a Service title check': (r) => r.body.includes('QA as a Service')
    });
};

export function getToContactUs() {
    let response = http.get(URL_PROVIDER.contactUs);

    check(response, {
        'is status 200 - Contact Us page': (r) => r.status === 200,
        'Contact Us page check': (r) => r.body.includes('Contact Our Team of Experts')
    });
};