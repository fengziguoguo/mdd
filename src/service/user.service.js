const mysql = require('mysql2');

const config = require('../app/config');

const connection = mysql.createPool({
    host: APP_HOST,
    port: APP_PORT,
    user: APP_USER,
    password: APP_PASSWORD,
    database: APP_DATABASE
})

connection.getConnection((err, conn) => {
    conn.connect(err => {
        if (err) {
            console.log(err);
        } else {
            console.log('node已经成功链接mysql,我在user-service.js文件下');
        }
    })
})

module.exports = connection.promise();