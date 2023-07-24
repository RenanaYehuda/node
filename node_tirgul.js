const fs = require("fs");
const { readFile } = require("fs/promises");


//Return content of file
exports.contentFile = async (_path) => {
  const result = await readFile(_path, "utf-8");
  return result;
};

//Write to file
exports.write = async (_path, _contant) => {
    await fs.writeFile(_path,_contant,(err)=> { 
        console.log(err); 
        });
};

//Create array of files
exports.createArrayfiles = (_directory) =>{
  let files = []
  filenames = fs.readdirSync(_directory);
  filenames.forEach(file => {
    files.push(file)
  });
  return files;
}
  
