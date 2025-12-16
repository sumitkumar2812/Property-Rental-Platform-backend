const fs = require("fs");
const os = require("os")
console.log(os.cpus().length)

fs.writeFile("./text.txt", "Hello I am Sumit Kumar",(err)=>{
    console.log("error")
});
fs.readFile("./text.txt","utf-8",(err,result)=>{
    if (err) {
        console.log("error:",err)
    } else{
        console.log(result)
    }
});
// fs.appendFileSync("./text.txt", `This is Sumit Kumar \n`)
// fs.cpSync("./text.txt","abp.js")
// fs.unlinkSync("./abp.js");
// console.log(fs.statSync("./text.txt"));
