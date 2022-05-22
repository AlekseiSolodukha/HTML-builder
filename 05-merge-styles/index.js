const fs = require('fs').promises;
const path = require('path');

const pathToFiles = path.join(__dirname, 'styles');

async function bundle(){    
  const files = await fs.readdir(pathToFiles, {withFileTypes: true});
  const styleArr = [];

  for(let file of files) {
    const pathToCurrentFile = path.join(pathToFiles, file.name);
    const fileExtantion = path.extname(pathToCurrentFile.toLowerCase());

    if(file.isFile() && fileExtantion === '.css'){
      const fileContent = await fs.readFile(pathToCurrentFile, 'utf8');
      styleArr.push(`${fileContent}\n`);
    };
  };
  await fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), styleArr.join(''));
}

try {
  bundle();
} catch (err) {
  console.error(err);
}