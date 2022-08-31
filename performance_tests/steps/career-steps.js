import http from 'k6/http';
import { URL_PROVIDER } from '../providers/url-provider.js';

const BUILD_ID = 'WOUJFhtzCND6ZOCInPo4w';

export function getToCareer(carrer){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/' + carrer + '.json';
    http.get(url);
};

export function getBack(){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US.json';
    http.get(url);
};

export function getToContactUs(){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/contact-us.json';
    http.get(url);
};

export function getToAboutUs(){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/about-us.json';
    http.get(url);
};

export function getToReviews(){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/reviews.json';
    http.get(url);
};