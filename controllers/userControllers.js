const User = require("../models/userModel");
const { generateToken } = require("../utils/generateAuthToken");
exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.status(401).send({
				message: "User already exist",
			});
		}

		const user = await User.create({
			username,
			email,
			password,
		});

		if (user) {
			return res.status(201).json({
				_id: user._id,
				name: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			return res.send({
				message: "User not found",
			});
		}
	} catch (error) {
		res.send({
			message: error.message,
		});
	}
};

exports.authUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send({
				message: "User not Found",
			});
		}
		const match = await user.matchPassword(password);
		if (user && match) {
			return res.json({
				_id: user._id,
				name: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).send({
				message: "Invalid email or password",
			});
		}
	} catch (err) {
		res.status(403).send({
			message: err.message,
		});
	}
};
