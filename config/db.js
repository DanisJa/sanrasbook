const mongoose = require('mongoose');
const config = require('config'); //gets default values
const db = config.get('mongoURI');

//Connecting to MongoDB
const connectDB = async () => {
	try {
		await mongoose.connect(db);
		console.log('MongoDB connected');
	} catch (err) {
		console.error(err);
		//exit process (failure)
		process.exit(1);
	}
};

module.exports = connectDB;
