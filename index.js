var fs = require("fs");
var csv = require('csv-parser');

try {
    fs.unlink('canada.txt', (err) => {
        if(err){
            console.log(err)
            return
        }
        console.log("canada.txt deleted successfully")
    })
}catch(err){
    console.log("canada.txt not found")
}

try {
    fs.unlink('usa.txt', (err) => {
        if(err){
            console.log(err)
            return
        }
        console.log("usa.txt deleted successfully")
    })
}catch(err){
    console.log("usa.txt not found")
}


var header = 'country,year,population'
fs.writeFileSync('canada.txt', header + "\n")
fs.createReadStream('input_countries.csv').pipe(csv())
.on('data', (row) => {
    if (row['country'] === 'Canada') {
        fs.appendFileSync('canada.txt', Object.values(row).join(",") + '\n')
        
    }
    if (row['country'] === 'United States') {
        fs.appendFileSync('usa.txt', Object.values(row).join(",") + '\n')

    }
})
.on('end', () => {
    console.log('CSV File finished reading')
})
