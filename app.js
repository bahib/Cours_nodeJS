const express = require("express");
const app = express();

app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/vues/index.html", (err) => {
        if (err) {
            res.status(500).send(err);
        }
    }
    );
});

app.get("/apropos", (req, res) => {
    res.sendFile(__dirname + "/vues/apropos.html", (err) => {
        if (err) {
        res.status(500).send(err);
        }
    }
    );
});

app.use((req, res) => {
    // res.status(404).send("Page introuvable !");
    res.sendFile(__dirname + "/vues/404.html");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});