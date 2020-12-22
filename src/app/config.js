const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    APP_ROOT,
    APP_HOST,
    APP_PORT,
    APP_USER,
    APP_PASSWORD,
    APP_DATABASE
} = process.env