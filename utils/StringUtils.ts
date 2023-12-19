class StringUtils {
	public encodeForUrl(text: string): string {
		return encodeURIComponent(text).replace(/%20|%0A|%C2%A0/g, '-');
	}
}

const stringUtils = new StringUtils();
export {stringUtils};
