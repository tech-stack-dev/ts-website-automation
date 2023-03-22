import randomstring from 'randomstring';

class SessionValue {
	public stringValue: string = randomstring.generate(6).toLowerCase();
	public numberValue: string = randomstring.generate({
		length: 6,
		charset: 'numeric'
	});
}

const sessionValue = new SessionValue();

export { sessionValue };