const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB Error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
