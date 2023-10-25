let fs = require('fs');
let path = require('path');


const inbox = path.join(__dirname, "inbox");
const outbox = path.join(__dirname, "outbox");

const reverseText = (str) => {
    let val = str.split("").reverse().join("");
    return val
}

const heel = () => console.log(inbox, "path", outbox);

fs.readdir(inbox, (error, files)=>{
    if(error) return console.log("Error: Folder inaccessible");
    
    files.forEach((file) => {
        fs.readFile(path.join(inbox, file), "utf8", (err, data) => {
            if(err) return console.log("Error: File inaccessible");
            fs.writeFile(path.join(outbox, file), reverseText(data), error => {
                if(error) return console.log("Error: File could not be saved!");;
                console.log(`${file} was successfully saved in the outbox`)
            })
        })
    })
});

heel();

// module.exports = {fileExm, heel};