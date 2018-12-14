var sql = require('mssql');
var dotenv = require('dotenv');
dotenv.load();

var dbConfig = {
    server: "localhost\\MSSQLSERVER01",
    database: "ac99db",
    user: process.env.user,
    password: process.env.password,
    port: "8000"
}

function getEmp() {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);
    conn.connect().then(function() {
        req.query("SELECT * FROM dbo.testOne").then(function(res) {
            console.log(res);
            conn.close();
        }).catch(function(err) {
            console.log(err);
            conn.close();
        })
    }).catch(function(err) {
        console.log(err);
    });
}

getEmp();