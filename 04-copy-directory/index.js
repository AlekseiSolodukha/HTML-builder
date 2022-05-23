const fs = require('fs').promises;
const path = require('path');

async function makeDirCopy(){
  const pathToFiles = path.join(__dirname, 'files');
  const pathToFilesCopy = path.join(__dirname, 'files-copy');

  await fs.mkdir(pathToFilesCopy, {recursive: true});

  const coppiedfiles = await fs.readdir(pathToFilesCopy);
  coppiedfiles.forEach(async (file) => {
    await fs.unlink(path.join(pathToFilesCopy, file));
  });

  const files = await fs.readdir(pathToFiles);
  files.forEach(async (file) => {
    await fs.copyFile(path.join(pathToFiles, file), path.join(pathToFilesCopy, file));
  });
}

try {
  makeDirCopy();
} catch (err) {
  console.error(err);
}