const mongoose = require("mongoose");
require('dotenv').config();

const connect = mongoose.connect(
  process.env.MONGODB_URI || `mongodb+srv://aakashmondal43:akash21082004@cluster0.dqiejnd.mongodb.net/Kyptronix?retryWrites=true&w=majority`
);

module.exports = { connect };
