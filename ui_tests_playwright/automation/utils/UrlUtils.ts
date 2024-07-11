export default class UrlUtils {
	public static getRandomUrlFromArray(urls: string[]): string {
		if (urls.length === 0) {
			throw new Error('The array of URLs is empty.');
		}
		const randomIndex = Math.floor(Math.random() * urls.length);
		return urls[randomIndex];
	}
}
