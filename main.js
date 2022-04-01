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
            "tallinn": parseInt(line[2]),
            "tartu": parseInt(line[3]),
            "parnu": parseInt(line[4]),
            "rakvere": parseInt(line[5]),
            "kunda": parseInt(line[6]),
            "sus1": parseFloat(line[7].replace(",", ".")),
            "sus2": parseFloat(line[8].replace(",", ".")),
            "mark": line[9],
            "price": parseFloat(line[10].replace(",", "."))
        })
    }

    var params = req.query

    var pageMarker = 0
    var pageLimit = 10
    var sort = "name"
    //var sortEmptyNames = false
    var filter;
    
    if(Object.keys(params).length > 0){
        if(params.sort){
            sort = params.sort
            // if(sortEmptyNames){
            //     data.sort(dynamicSortMultiple(sort.split(":")))
            // } else {
            //     data = data.filter(e => e.name.replaceAll(" ", "").length != 0)
            //     data.sort(dynamicSortMultiple(sort.split(":")))
            // }

            data.sort(dynamicSortMultiple(sort.split(":")))
        }

        if(params.filter){
            filter = params.filter
            var filterArgs = filter.split("$")
            if(filterArgs.length == 2){
                data = data.filter(e => e[filterArgs[0]].toLowerCase().includes(filterArgs[1].toLowerCase()))
            }
        }

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
                    "message": `Request index ${pageMarker * pageLimit + pageLimit} out of bounds, ${data.length} entities exist.`
                }
            })
        }
    }

    return res.json({
        "code": "200",
        "data": data.slice(pageMarker * pageLimit, pageMarker * pageLimit + pageLimit)
    })
});

app.get('*', (req, res) => {
    return res.json({
        "code": 404,
        "message": "Invalid endpoint"
    })
})

app.listen("3030", () => {
    console.log(`Example app listening on port 3030}`)
})

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple(props) {
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;

        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}