// Imports
import fs from 'fs';

const entries = fs.readFileSync('LE.txt', 'utf-8').split("\n")
var data = {}
for(var i = 0; i < entries.length; i++){
    var line = entries[i].split("\t")
    for(var j = 0; i < entries.length; i++){
        i.replaceAll("\"", "")
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

console.log(Object.values(data)[0])