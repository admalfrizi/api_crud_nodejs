const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    database: "aplikasi_crud",
    user: "root",
    password: "",
})

module.exports = db;