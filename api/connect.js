import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sh@shwatSql02",
    database: "social",
    insecureAuth: true,
});
