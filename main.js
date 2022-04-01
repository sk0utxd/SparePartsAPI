// Imports
import fs from 'fs';
import express from 'express';

const app = express();

app.get('/parts', (req, res) => {
    const entries = fs.readFileSync('TEST.txt', 'utf-8').split("\r\n")
    var data = {}
    for(var i = 0; i < entries.length; i++){
        var line = entries[i].split("\t")
        for(var j = 0; j < line.length; j++){
            line[j] = line[j].replaceAll("\"", "")
        }

        data[line[0]] = {
            "name": line[1],
            "laod": {
                "tallinn": line[2],
                "tartu": line[3],
                "parnu": line[4],
                "rakvere": line[5],
                "kunda": line[6]
            },
            "sus1": line[7],
            "sus2": line[8],
            "carMark": line[9],
            "price": line[10]
        }
    }

    var send = Object.fromEntries(
        Object.entries(data).slice(0, 10)
    )
    return res.json(send)
});

app.listen("3030", () => {
    console.log(`Example app listening on port 3030}`)
})