exports.validateLength = (username) => {
	console.log(username.length);
	if (username.length >= 6 || username.length <= 12) {
		return true;
	}
};

exports.validateCharacter = (username) => {
	const reg = new RegExp("([A-Za-z0-9-_ ])");
	console.log(reg.test(username));
	return reg.test(username);
};
