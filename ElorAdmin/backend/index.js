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
  database: "elorbase3",
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
      return res
        .status(401)
        .json({ message: "Erabiltzailea edo pasahitz okerra" });
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
      return res
        .status(200)
        .json({ message: "Erabiltzaileak lortu dira", users: results });
    } else {
      return res.status(404).json({ message: "Erabiltzaileak ez dira lortu" });
    }
  });
});

app.get("/get-horarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "'Id parametroa ez da balidoa'" });
  }

  const query =
    "SELECT h.dia, h.hora, h.profe_id, m.nombre, m.nombre_eus, m.nombre_en FROM horarios h INNER JOIN modulos m ON h.modulo_id = m.id WHERE h.profe_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error datubasera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const horarios = results.map((row) => ({
        dia: row.dia,
        hora: row.hora,
        profe_id: row.profe_id,
        modulo_izena_es: row.nombre,
        modulo_izena_eu: row.nombre_eus,
        modulo_izena_en: row.nombre_en,
      }));

      return res.status(200).json({ message: "Horarios obtenidos", horarios });
    } else {
      return res.status(404).json({ message: "No se encontraron horarios" });
    }
  });
});

app.get("/get-horarios-alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "'Id parametroa ez da balidoa'" });
  }

  const query = `
    SELECT 
      h.dia, h.hora,
      h.profe_id,
      MIN(m.nombre) AS nombre,
      m.nombre_eus,
      m.nombre_en,
    MIN(m.nombre) AS modulo, 
      c.nombre AS ciclo,
    u.username
    FROM 
      horarios h
    JOIN 
      modulos m ON h.modulo_id = m.id
    JOIN 
      ciclos c ON m.ciclo_id = c.id
    JOIN 
      matriculaciones mtr ON mtr.ciclo_id = c.id AND mtr.curso = m.curso 
    JOIN 
      users u ON mtr.alum_id = u.id
    WHERE 
      mtr.alum_id = ?
    GROUP BY 
      h.dia, h.hora, c.nombre, u.username;
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error datubasera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const horarios = results.map((row) => ({
        dia: row.dia,
        hora: row.hora,
        profe_id: row.profe_id,
        modulo_izena_es: row.nombre,
        modulo_izena_eu: row.nombre_eus,
        modulo_izena_en: row.nombre_en,
      }));

      return res.status(200).json({ message: "Horarios obtenidos", horarios });
    } else {
      return res.status(404).json({ message: "No se encontraron horarios" });
    }
  });
});

app.get("/get-ciclos", (req, res) => {
  const query = "SELECT * FROM ciclos";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const ciclos = results.map((row) => ({
        id: row.id,
        nombre: row.nombre,
      }));

      return res.status(200).json({ ciclos });
    } else {
      return res.status(404).json({ ciclos: [] });
    }
  });
});

app.get("/get-ciclos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "'Id parametroa ez da balidoa'" });
  }

  const query = `
    SELECT c.id, c.nombre
    FROM ciclos c
    JOIN matriculaciones m ON c.id = m.ciclo_id
    WHERE m.alum_id = ?;
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      return res.status(200).json({ ciclos: results });
    } else {
      return res.status(404).json({ ciclos: [] });
    }
  });
});

app.put("/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const { id, ...newItem } = req.body;

  if (!userId || Object.keys(newItem).length === 0) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const query = "UPDATE users SET ? WHERE id = ?";

  db.query(query, [newItem, userId], (err, results) => {
    if (err) {
      console.error("Error al actualizar el usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado con éxito", ...newItem });
  });
});

app.post("/insert-user", (req, res) => {
  const newItem = req.body;
  const query = "INSERT INTO users SET ?";
  db.query(query, newItem, (err, results) => {
    if (err) throw err;
    res.send({ id: results.insertId, ...newItem });
  });
});

app.delete("/delete-user/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/get-reuniones", (req, res) => {
  const query = "SELECT * FROM reuniones r";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error datubasera konektatzean:", err);
      return res.status(500).json({ message: "Errorea zerbitzarian" });
    }

    if (results.length > 0) {
      const reuniones = results.map((row) => ({
        id_reunion: row.id_reunion,
        estado_es: row.estado,
        estado_eus: row.estado_eus,
        estado_en: row.estado_en,
        profesor_id: row.profesor_id,
        alumno_id: row.alumno_id,
        id_centro: row.id_centro,
        titulo: row.titulo,
        asunto: row.asunto,
        aula: row.aula,
        fecha: row.fecha,
      }));

      return res
        .status(200)
        .json({ message: "Reuniones obtenidas", reuniones });
    } else {
      return res.status(404).json({ message: "No se encontraron reuniones" });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});
