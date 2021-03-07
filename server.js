const express = require("express");
const app  = express();
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid")

const PORT = 3000;

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html")
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public" + "/notes.html"))
})

app.get("/api/notes", (req, res) => {
    const rawData = fs.readFileSync("./db/db.json");
    const data = JSON.parse(rawData);
    res.json(data);
})

app.post("/api/notes", (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    try {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            const noteArray = JSON.parse(data)
            noteArray.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
                if (err) throw err;
                res.json(noteArray);
            })
        })
    } catch (e) {
        res.status(500).json(e);
    }
})

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})