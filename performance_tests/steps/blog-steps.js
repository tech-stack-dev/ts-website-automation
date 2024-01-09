import { check } from 'k6';
import http from 'k6/http';
import { URL_PROVIDER } from '../providers/url-provider.js';

export function goToBlog() {
    let response = http.get(URL_PROVIDER.blog);

    check(response, {
        'is status 200 - Blog page': (r) => r.status === 200,
        'Blog page check': (r) => r.body.includes('Blog')
    });
}

export function getTechStackNews() {
    let response = http.get(URL_PROVIDER.techStackNews);

    check(response, {
        'is status 200 - TechStackNews page': (r) => r.status === 200,
        'Techstack News tag check': (r) => r.body.includes('Techstack News - tag')
    });
};

export function getQualityEngineering() {
    let response = http.get(URL_PROVIDER.qualityEngineering);

    check(response, {
        'is status 200 - QualityEngineering tag': (r) => r.status === 200,
        'QualityEngineering tag check': (r) => r.body.includes('Quality Engineering - tag')
    });
};