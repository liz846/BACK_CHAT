const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MongoDB no configurado, continuando sin DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Running");
  } catch (error) {
    console.error("Can't connect to database");
    console.error(error);
  }
};

module.exports = { connectDB };
