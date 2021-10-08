module.exports = (err, req, res, next) => {
	// console.log("error name is: ", err.name);
	// console.log("err errors: ", err.errors);
	// console.log("error: ", err);
	let errObj = {
		// emailChar: "",
		// emailSame: "",
		// usernameSame: "",
		// code: null,
	};

	console.log("error is: ", err);

	let code, message, path;

	if (err.storageErrors) {
		errObj.imageFormat = err.message;
		errObj.code = 400;
	}

	//for email validation
	if (err.name === "SequelizeValidationError" && err.errors[0].validatorName === "isEmail") {
		errObj.emailChar = "invalid email format";
		errObj.code = 400;
	}

	//for unique constraint
	if (err.name === "SequelizeUniqueConstraintError" && err.errors[0].path === "users.username") {
		// code = 400;
		// message = "username already in use";
		// path = "username";
		errObj.usernameSame = "username already in use";
		errObj.code = 400;
	}
	if (err.name === "SequelizeUniqueConstraintError" && err.errors[0].path === "users.email") {
		// code = 400;
		// message = "email already in use";
		// path = "email";
		errObj.emailSame = "email already in use";
		errObj.code = 400;
	}

	if (err.name === "validationErrorObject") {
		// console.log(JSON.stringify(err.message));
		errObj = { ...errObj, ...JSON.parse(err.message) };
		errObj.code = 400;
	}

	if (err.name === "JsonWebTokenError") {
		code = 401;
	}

	if (err.name === "TokenExpiredError") {
		code = 401;
	}

	// console.log(errObj);

	res.status(errObj.code || 500).send({
		message: Object.keys(errObj).length !== 0 ? errObj : err.message,
		// path: path,
		// name: err.name,
	});
};
