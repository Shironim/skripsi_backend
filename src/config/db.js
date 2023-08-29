import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log(process.env.DB_HOST)

export default connection.promise();