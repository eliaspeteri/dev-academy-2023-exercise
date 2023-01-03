import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string =
  process.env.NODE_ENV === 'test'
    ? (process.env.MONGODB_TEST_URI as string)
    : (process.env.MONGODB_URI as string);

export default {
  PORT: (process.env.PORT as string) || '8080',
  URL: (process.env.URL as string) || 'http://localhost',
  MONGODB_URI,
  RECEIVER_EMAIL: process.env.RECEIVER_EMAIL as string,
  SENDER_EMAIL: process.env.SENDER_EMAIL as string,
  SENDER_PASSWORD: process.env.SENDER_PASSWORD as string
};
