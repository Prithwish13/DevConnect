const fs = require('fs');
const path = require('path');

exports.removerFile = (filepath) =>{
    filepath = path.join(__dirname,'..',filepath);
    fs.unlink(filepath,(err)=>{
        if(err){
            console.log('unable to delete the file');
        }
    });
};