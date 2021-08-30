const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose default connection is open');
});

db.on('error', err => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose default connection has disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
      console.log('Mongoose dafult connection is disconnected due to application termination');
      process.exit(0);
  });
});

module.exports = db;