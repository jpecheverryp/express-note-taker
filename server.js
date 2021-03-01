const express = require("express");
const app  = express();
const path = require("path");

const PORT = 3000;

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("./public/index.html")
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public" + "/notes.html"))
})

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})