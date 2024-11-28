class StringUtils {
	public encodeForUrl(text: string): string {
		return encodeURIComponent(text).replace(/%20|%0A|%C2%A0/g, '-');
	}

	public removeNewLineCharachters(text: string | null): string {
		return text!.replace(/\n/g, '');
	}

	public removeHyphenCharachters(text: string | null): string {
		return text!.replace(/-/g, '');
	}
}

const stringUtils = new StringUtils();
export {stringUtils};
