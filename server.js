import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { configDotenv } from 'dotenv';
import app from './app.js';

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! ⛔️ Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
// configDotenv({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! ⛔️ Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// SIGTERM signal is a signal sent to a process to request its termination
// process.on('SIGTERM', () => {
//   console.log('SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated!');
//   });
// });
