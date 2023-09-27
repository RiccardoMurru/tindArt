const mongoose = require('mongoose');
const dbPort = 27017;
const dbName = 'tindart';

(async () => {
  try {
    mongoose.connect(`mongodb://127.0.0.1:${dbPort}/${dbName}`);
    console.log(`Database connected on port ${dbPort}!`);
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
})()


module.exports = mongoose;
