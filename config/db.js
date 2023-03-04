const mongoose = require("mongoose");

exports.connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(
			`MongoDB Connected: ${conn.connection.host}🔥🔥🔥🚀🚀`.green.underline
		);
	} catch (err) {
		console.error(`Error:${err.message}`.red.underline.bold);
		process.exit(1);
	}
};
