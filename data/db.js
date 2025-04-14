const mysql = require('mysql');

const credentials = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

const connection = mysql.createConnection(credentials)

connection.connect((err) => {
    if (err) throw new err;
    console.log('Connected to MYSQL');

})


module.exports = connection