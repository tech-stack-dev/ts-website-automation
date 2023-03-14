class StringUtils {
	public convertToPascalCase(str: string) {
		return (str.match(/[a-zA-Z0-9]+/g) || [])
			.map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
			.join('');
	}
}

const stringUtils = new StringUtils();
export {stringUtils};
