const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerError = require("../ultils/error");
const userValidate = require("../services/userValidate");
const passwordValidate = require("../services/passwordValidate");

exports.registerUser = async (req, res, next) => {
	try {
		// let hasError = false;
		const errMessage = {
			// usernameLength: "",
			// usernameChar: "",
			// passwordLength: "",
			// passwordChar: "",
			// confirmPassword: "",
		};
		const { username, email, password, confirmPassword, birthDate } = req.body;

		if (!userValidate.validateLength(username)) {
			console.log("**********userLength");
			errMessage.usernameLength = "username must be 6-12 characters long";
			hasError = true;
			// throw new CustomerError("username must be 6-12 characters long", 400, "username");
		}
		if (!userValidate.validateCharacter(username)) {
			console.log("**********userChar");
			errMessage.usernameChar = "username must consists of alphabets, number, dash, or underscore only";
			hasError = true;
			// throw new CustomerError(
			// 	"username must consists of alphabets, number, dash, or underscore only",
			// 	400,
			// 	"username"
			// );
		}
		if (password !== confirmPassword) {
			console.log("**********confpass");
			errMessage.confirmPassword = "confirm password does not match";
			hasError = true;
			// throw new CustomerError("confirm password does not match", 400);
		}
		if (!passwordValidate.validateLength(password)) {
			console.log("**********passlength");
			errMessage.passwordLength = "password must be at least 8 characters long";
			hasError = true;
			// throw new CustomerError("password must be at least 8 characters long", 400, "password");
		}
		if (!passwordValidate.validateCharacter(password)) {
			console.log("**********passschar")(
				(errMessage.passwordChar = "password must contain small letter, capitalized letter, and number")
			),
				(hasError = true);
			// throw new CustomerError(
			// 	"password must contain small letter, capitalized letter, and number",
			// 	400,
			// 	"password"
			// );
		}

		// if (hasError) {
		if (Object.keys(errMessage).length !== 0) {
			console.log(errMessage);
			throw new CustomerError(JSON.stringify(errMessage), 400, "validationErrorObject");
		}
		const hashed = await bcrypt.hash(password, 12);
		const toAdd = {
			username,
			email,
			password: hashed,
			birthDate,
		};
		const user = await User.create({ ...toAdd });
		console.log(user);
		res.send({ user });
	} catch (err) {
		console.dir(err);
		console.log("regis err: ", err);
		next(err);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const result = await User.findOne({ where: { username } });
		if (!result) {
			return res.status(400).send({ message: "incorrect username or password", name: "loginError" });
		}
		const isPasswordCorrect = await bcrypt.compare(password, result.password);
		if (isPasswordCorrect) {
			const payload = {
				id: result.id,
				username: result.username,
				email: result.email,
				userType: result.userType,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
			res.send({ token }); //will be used on frontend
		} else {
			return res.status(400).send({ message: "incorrect username or password", name: "loginError" });
		}
	} catch (err) {
		next(err);
	}
};
