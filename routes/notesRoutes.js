const express = require("express");
const router = express.Router();

// Route pour la page d'accueil
router.get("/", (req, res) => {
    const heureConnectee = new Date().toLocaleTimeString(); // Heure actuelle
    const nom = "Ibrahim BAH"; // Ajout de la variable nom

    req.getConnection((err, connection) => {
        if (err){
            console.log("Impossible de se connecter à la base de données !");
            
        } else {
            connection.query("SELECT * FROM notes", (err, rows) => {
                if (err) {
                    console.log("Impossible de récupérer les notes !");
        
                } else {
                    res.status(200).render("index", {heure: heureConnectee, notes: rows, nom });
                }
            });
        }
    });
});

router.post("/notes", (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    // console.log(req.body);
    const { titre, description } = req.body;

    let reqSql = id === null ? "INSERT INTO notes (id, titre, description) VALUES (?, ?, ?)" : "UPDATE notes SET titre = ?, description = ? WHERE id = ?";
    
    let donnees = id === null ? [null, titre, description] : [titre, description, id];
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Impossible de se connecter à la base de données !");
        } else {
            connection.query(reqSql, donnees, (err, rows) => {
                if (err) {
                    console.log("Impossible d'ajouter la note !");
                } else {

                    res.status(300).redirect("/");
                }
            });
        }
    });
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Impossible de se connecter à la base de données !");
        } else {
            connection.query("DELETE FROM notes WHERE id = ?", [id], (err, rows) => {
                if (err) {
                    console.log("Impossible de supprimer la note !");
                } else {
                    res.status(300).json({routeRacine: "/"});
                }
            });
        }
    });
});

module.exports = router;
