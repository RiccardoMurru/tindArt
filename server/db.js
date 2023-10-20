require('dotenv').config();
const mongoose = require('mongoose');
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;

(async () => {
  try {
    mongoose.connect(`${dbUrl}:${dbPort}/${dbName}`);
    console.log(`Database connected on port ${dbPort}!`);
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
})()


module.exports = mongoose;
