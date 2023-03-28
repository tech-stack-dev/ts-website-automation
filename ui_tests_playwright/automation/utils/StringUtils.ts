class StringUtils {
	sessionId = this.CreateSessionRandomString(6);
	public convertToPascalCase(str: string) {
		return (str.match(/[a-zA-Z0-9]+/g) || [])
			.map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
			.join('');
	}

	public AddRandom(str: string) {
		return str.replace('{SRND}', this.sessionId);
	}

	private CreateSessionRandomString(length: number) {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let sessionId = '';
		for (let i = 0; i < length; i++) {
			sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return sessionId;
	}
}

const stringUtils = new StringUtils();
export {stringUtils};
