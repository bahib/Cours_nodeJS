const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodes_bd"
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion :", err.message);
    } else {
        console.log("Connexion réussie !");
    }
    connection.end();
});
