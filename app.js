const express = require("express");
const app = express();

// Definition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", __dirname + "/vues");

// Middleware pour les fichiers statiques
// app.get("/", (req, res) => { 
//     res.sendFile(__dirname + "/vues/index.html", (err) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//     }
//     );
// });

app.get("/", (req, res) => { 
    const heureConnectee = Date().toString();
    const notes = [{id: 1, titre: "Note 1", contenu: "Contenu de la note 1"}, {id: 2, titre: "Note 2", contenu: "Contenu de la note 2"},
        {id: 3, titre: "Note 3", contenu: "Contenu de la note 3"}, {id: 4, titre: "Note 4", contenu: "Contenu de la note 4"}
    ];   
    
    res.status(200).render("index", {heure: heureConnectee, notes});
});


// app.get("/apropos", (req, res) => {
//     res.sendFile(__dirname + "/vues/apropos.html", (err) => {
//         if (err) {
//         res.status(500).send(err);
//         }
//     }
//     );
// });

app.get("/apropos", (req, res) => {
    res.status(200).render("apropos");
});

// app.use((req, res) => {
//     // res.status(404).send("Page introuvable !");
//     res.sendFile(__dirname + "/vues/404.html");
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Quelque chose s'est mal passé !");
} );

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});