const mongoose = require('mongoose');
const dbPort = 27017;
const dbName = 'tindart';
// const uri = 'mongodb+srv://admin:admin123@tindart.yhx11fx.mongodb.net/?retryWrites=true&w=majority';

(async () => {
  try {
    mongoose.connect(`mongodb://127.0.0.1:${dbPort}/${dbName}`);
    mongoose.connect(uri)
    console.log(`Database connected on port ${dbPort}!`);
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
})()


module.exports = mongoose;
