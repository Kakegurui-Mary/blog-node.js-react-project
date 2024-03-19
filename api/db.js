import mysql2 from "mysql2";
export const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Karainci2000",
  database: "blog",
});

/* import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.DB_KEY,
  database:"blog"
}) */

/* import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "Karainci2000",
  database:"recipe"
}); */