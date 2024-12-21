const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const server = express();

// Configuration de la base de données avec les variables d'environnement
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crudgames",
});

// Middleware
server.use(express.json());
server.use(cors());

// === ROUTES ===

// Route pour enregistrer un jeu
server.post("/register", (req, res) => {
    const { name, cost, category } = req.body;

    let sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)";
    db.query(sql, [name, cost, category], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion :", err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Route pour obtenir tous les jeux
server.get("/games", (req, res) => {
    let sql = "SELECT * FROM games";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération :", err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Route pour modifier un jeu
server.put("/edit", (req, res) => {
    const { id, name, cost, category } = req.body;

    let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    db.query(sql, [name, cost, category, id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Route pour supprimer un jeu
server.delete("/delete/:index", (req, res) => {
    const { index } = req.params;

    let sql = "DELETE FROM games WHERE idgames = ?";
    db.query(sql, [index], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression :", err);
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Démarrage du serveur
server.listen(3001, () => {
    console.log("Le serveur tourne sur le port 3001");
});
