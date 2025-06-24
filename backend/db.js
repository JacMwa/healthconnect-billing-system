const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'hospital_management'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database!');
});

module.exports = db;
