
const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");

const app = express();

const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));



app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


//ROUTES

// API GET Requests
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, notesData) => {
        if (err) throw err;
        res.json(JSON.parse(notesData));
    });
});

// API POST Requests
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let notesData = JSON.parse(data);
        notesData.push(req.body);

        for (let index = 0; index < notesData.length; index++) {
          notesData[index].id= index + 1
          
        }

        fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
            if (err) throw err;
            res.send(db);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (error, data) => {
    if (error) {
      throw error
    }
    let newNote = JSON.parse(data)
    for (let i =0; i< newNote.length; i++)
    {
      if (newNote[i].id == req.params.id){
        newNote.splice(i, 1)
      } 
    }
    fs.writeFile("./db/db.json", JSON.stringify(newNote), (error) => {
      if (error){
        throw error
      }
      res.send(newNote)
    })
  })
})


// HTML GET Requests
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});