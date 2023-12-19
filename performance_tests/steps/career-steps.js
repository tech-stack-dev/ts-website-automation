import { check } from 'k6';
import http from 'k6/http';
import { parseHTML } from 'k6/html';
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";
import { URL_PROVIDER } from '../providers/url-provider.js';

export function getBuildId(){
    const response = http.get(URL_PROVIDER.webApp);
    const doc = parseHTML(response.body);
    const nextDataJson = doc.find('body script#__NEXT_DATA__').text();
    const buildId = jsonpath.value(JSON.parse(nextDataJson), 'buildId');
    return buildId;
}

export function getToWebsite(){
    let response = http.get(URL_PROVIDER.webApp);

    check(response, {
        'is status 200 - Home page': (r) => r.status === 200,
        'Home page check': (r) => r.body.includes('Make\nan impact')
    });
}

export function getToCareer(carrerId, careerTitle, buildId){
    const url = `${URL_PROVIDER.webApp}/_next/data/${buildId}/en-US/${carrerId}.json`;

    let response = http.get(url);

    check(response, {
        'is status 200 - Career page': (r) => r.status === 200,
        'Career title check': (r) => r.body.includes(careerTitle)
    });
};

// navaiget back from career page
export function getBack(buildId){
    const url = `${URL_PROVIDER.webApp}/_next/data/${buildId}/en-US.json`;

    let response = http.get(url);

    check(response, {
        'is status 200 - Home page back from Career page': (r) => r.status === 200,
        'Home page opened back from career check': (r) => r.body.includes('https://staging-career.tech-stack.io')
    });
};

export function getToContactUs(buildId){
    const url = `${URL_PROVIDER.webApp}/_next/data/${buildId}/en-US/contact-us.json`;

    let response = http.get(url);

    check(response, {
        'is status 200 - Contact Us page': (r) => r.status === 200,
        'Contact Us page check': (r) => r.body.includes('https://staging-career.tech-stack.io/ContactUs')
    });
};

export function getToAboutUs(buildId){
    const url = `${URL_PROVIDER.webApp}/_next/data/${buildId}/en-US/about-us.json`;

    let response = http.get(url);

    check(response, {
        'is status 200 - About Us page': (r) => r.status === 200,
        'About Us page check': (r) => r.body.includes('https://staging-career.tech-stack.io/AboutUs')
    });
};

export function getToReviews(buildId){
    const url = `${URL_PROVIDER.webApp}/_next/data/${buildId}/en-US/reviews.json`;

    let response = http.get(url);

    check(response, {
        'is status 200 - Reviews page': (r) => r.status === 200,
        'Reviews page check': (r) => r.body.includes('https://staging-career.tech-stack.io/Rev')
    });
};