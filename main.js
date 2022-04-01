// Imports
import fs from 'fs';
import express from 'express';

const app = express();

app.get('/parts', (req, res) => {
    const entries = fs.readFileSync('LE.txt', 'utf-8').split("\n")
    var data = []
    for(var i = 0; i < entries.length; i++){
        var line = entries[i].split("\t")
        for(var j = 0; j < line.length; j++){
            line[j] = line[j].replaceAll("\"", "")
        }

        data.push({
            "id": line[0],
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
        })
    }

    var params = req.query
    //default
    var pageMarker = 0
    var pageLimit = 10
    
    if(Object.keys(params).length > 0){
        //filter functions
        
        if(params.page){
            var page = parseInt(params.page)
            switch(true){
                case (page > 0):
                    pageMarker = page
                    break
            }
        }

        if(params.limit){
            var limit = parseInt(params.limit)
            switch(true){
                case (limit <= 1):
                    pageLimit = 1
                    break
                
                case (limit < 51):
                    pageLimit = limit
                    break

            }
        }

        if(pageMarker * pageLimit + pageLimit > data.length){
            return res.json({
                "error": {
                    "code": 404,
                    "message": `Requested content out of bounds, searched for entity with index of ${pageMarker * pageLimit + pageLimit}, only ${data.length} entities exist.`
                }
            })
        }
    }

    return res.json({
        "code": "200",
        "data": data.slice(pageMarker * pageLimit, pageMarker * pageLimit + pageLimit)
    })
});

app.listen("3030", () => {
    console.log(`Example app listening on port 3030}`)
})