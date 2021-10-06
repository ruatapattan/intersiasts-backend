class CustomError extends Error {
	constructor(message, code, name) {
		super(message);
		this.code = code;
		this.name = name;
	}
}

module.exports = CustomError;
