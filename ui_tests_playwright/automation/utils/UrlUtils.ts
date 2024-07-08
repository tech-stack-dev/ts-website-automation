export default class UrlUtils {
	public static getRandomUrlFromRecord<K extends keyof any, T>(record: Record<K, T>): T {
		const urls = Object.values(record) as T[];
		const randomIndex = Math.floor(Math.random() * urls.length);
		return urls[randomIndex];
	}
}
