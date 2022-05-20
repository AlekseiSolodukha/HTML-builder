const fs = require('fs');
const path = require('path');

async function makeDirCopy(){
  const pathToFiles = path.join(__dirname, 'files');
  const pathToFilesCopy = path.join(__dirname, 'files-copy'); 
  await fs.promises.mkdir(pathToFilesCopy, {recursive: true});
  const files = await fs.promises.readdir(pathToFiles);
  files.forEach(async (file) => {
    await fs.promises.copyFile(path.join(pathToFiles, file), path.join(pathToFilesCopy, file));
  });
}

try {
  makeDirCopy();
} catch (err) {
  console.error(err);
}