var notesData = require("../db/db.json");
var fs = require("fs");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function (req, res) {
        console.log(req.body)
        req.body.id = notesData.length
        notesData.push(req.body)
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData))
        res.json(true)
    });

    app.delete("/api/notes/:id", function (req, res) {
        var updatedList = notesData.filter(function(note){
            if(note.id !== parseInt(req.params.id)){
                return true
            }
        })
        notesData = updatedList
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData))
        res.json({ ok: true });
    });
};
