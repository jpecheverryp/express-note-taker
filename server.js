const express = require("express");

const app  = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})