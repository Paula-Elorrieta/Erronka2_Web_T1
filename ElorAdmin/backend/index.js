const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs"); // Usamos bcryptjs
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "elorbase",
  port: "3307",
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Erabiltzailea eta pasahitza behar dira" });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Errorea kontsultan:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const user = results[0];
      
      return res.status(200).json({ message: "Login ondo", user: user });
    } else {
      return res.status(401).json({ message: "Erabiltzailea edo pasahitz okerra" });
    }
  });
});

app.get("/get-users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Erabiltzaileak lortu dira", users: results });
    } else {
      return res.status(404).json({ message: "Erabiltzaileak ez dira lortu" });
    }
  });
});

app.get("/get-horarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); 
  if (isNaN(id)) {
    return res.status(400).json({ message: "El parámetro 'id' debe ser un número válido" });
  }

  const query = "SELECT h.dia, h.hora, h.profe_id, m.nombre, m.nombre_eus, m.nombre_en FROM horarios h INNER JOIN modulos m ON h.modulo_id = m.id WHERE h.profe_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al conectarse a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      const horarios = results.map(row => ({
        dia: row.dia,
        hora: row.hora,
        profe_id: row.profe_id,
        modulo_izena_es: row.nombre,
        modulo_izena_eu: row.nombre_eus,
        modulo_izena_en : row.nombre_en
      }));

      return res.status(200).json({ message: "Horarios obtenidos", horarios });
    } else {
      return res.status(404).json({ message: "No se encontraron horarios" });
    }
  });
});

app.get("/get-reuniones/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); 
  if (isNaN(id)) {
    return res.status(400).json({ message: "El parámetro 'id' debe ser un número válido" });
  }

  const query = `
    SELECT r.id_reunion, r.estado, r.estado_eus, r.profesor_id, r.alumno_id, r.id_centro, 
           r.titulo, r.asunto, r.aula, r.fecha
    FROM reuniones r
    WHERE r.profesor_id = ? 
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al conectarse a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      const reuniones = results.map(row => ({
        id_reunion: row.id_reunion,
        estado: row.estado,
        estado_eus: row.estado_eus,
        profesor_id: row.profesor_id,
        alumno_id: row.alumno_id,
        id_centro: row.id_centro,
        titulo: row.titulo,
        asunto: row.asunto,
        aula: row.aula,
        fecha: row.fecha
      }));

      return res.status(200).json({ message: "Reuniones obtenidas", reuniones });
    } else {
      return res.status(404).json({ message: "No se encontraron reuniones" });
    }
  });
});






const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});
