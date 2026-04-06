const dotenv = require('dotenv');
dotenv.config(); // Loads variables from .env

const env = process.env.NODE_ENV || 'qa';

const urls = {
  qa: process.env.QA_BASE_URL,
  dev: process.env.DEV_BASE_URL,
  prod: process.env.PROD_BASE_URL
};

module.exports = {
  baseURL: urls[env],
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
