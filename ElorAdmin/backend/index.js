const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "12345678",
  database: "adibidea", 
  port: '3307' , 
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});
