// Modules
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = function (app) {
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
                const noteArray = JSON.parse(data);
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

    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;
        try {
            // Reading the database 
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                // Handling Error
                if (err) throw err;
                // Storing Notes array
                const noteArray = JSON.parse(data);
                // finding note using id
                const selectedNote = noteArray.find(element => element.id === noteId);
                // getting index of the note
                const noteIndex = noteArray.indexOf(selectedNote);
                // removing note from array
                if (noteIndex > -1) {
                    noteArray.splice(noteIndex, 1);
                }
                // writing notes to DB
                fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
                    // handling error
                    if (err) throw err;
                    // sending response to client
                    res.json(noteArray)
                })
            })
        } catch (e) {
            res.status(500).json(e);
        }
    })
}