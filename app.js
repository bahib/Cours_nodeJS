const express = require("express");
const mysql = require("mysql");
const mysqlConnection = require("express-myconnection");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

// Middleware pour le traitement des données POST
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données
const dbOptions = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "nodes_bd",
};

// Définition du middleware pour la connexion à la base de données
app.use(mysqlConnection(mysql, dbOptions, "pool"));


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

    
    // const notes = [
    //     { id: 1, titre: "Note 1", contenu: "Contenu de la note 1" },
    //     { id: 2, titre: "Note 2", contenu: "Contenu de la note 2" },
    //     { id: 3, titre: "Note 3", contenu: "Contenu de la note 3" },
    //     { id: 4, titre: "Note 4", contenu: "Contenu de la note 4" },
    // ];
    

    // Rendu de la vue index avec les données
    // res.status(200).render("index", { heure: heureConnectee, notes, nom });
// });

// Définition des routes pour notes
app.use("/", notesRoutes);

// app.get("/apropos", (req, res) => {
//     res.sendFile(__dirname + "/vues/apropos.html", (err) => {
//         if (err) {
//         res.status(500).send(err);
//         }
//     }
//     );
// });

// Route pour la page À propos


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