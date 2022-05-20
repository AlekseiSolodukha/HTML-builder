const fs = require('fs');
const path = require('path');

async function readFilesInDir(){
  const pathToFile = path.join(__dirname, 'secret-folder');
  const files = await fs.promises.readdir(pathToFile, {withFileTypes: true});
  for (const file of files)
    if(file.isFile()){
      let fileName = file.name.split('.').shift();
      let extantion = file.name.split('.').pop();
      let stat = await fs.promises.stat(path.join(__dirname, `secret-folder/${file.name}`));
      console.log(`${fileName} - ${extantion} - ${stat.size}bytes`);
    }      
}

try {
  readFilesInDir();
} catch (err) {
  console.error(err);
}