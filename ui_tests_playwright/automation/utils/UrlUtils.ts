import {driver} from '../base/driver/Driver';
import UrlPath from '../providers/UrlPath';
import UrlProvider from '../providers/UrlProvider';

export default class UrlUtils {
	public static getRandomUrlFromArray(urls: string[]): string {
		if (urls.length === 0) {
			throw new Error('The array of URLs is empty.');
		}
		const randomIndex = Math.floor(Math.random() * urls.length);
		return urls[randomIndex];
	}

	public static async isValidTechstackPageUrl(url: string): Promise<void> {
		const isWebsitePage = url.includes(UrlProvider.webSiteUrl());

		if (isWebsitePage) {
			const isPage404 = driver.Page.url().includes(UrlPath.PageNotFound);

			if (isPage404) {
				throw new Error(`The "${url}" page not found. The 404 techstack page is shown`);
			}
		} else {
			console.log(`The "${url}" is not TS website page`);
		}
	}
}
