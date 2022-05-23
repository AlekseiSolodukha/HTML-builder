const fs = require('fs').promises;
const path = require('path');

const pathToStylesFiles = path.join(__dirname, 'styles');
const pathToHTMLFiles = path.join(__dirname, 'components');
const pathToAssetsFiles = path.join(__dirname, 'assets');
const pathToHTMLTemplate = path.join(__dirname, 'template.html');
const pathToResultFiles = path.join(__dirname, 'project-dist');
const pathToResultAssets = path.join(pathToResultFiles, 'assets');
const pathToResultHTML = path.join(pathToResultFiles, 'index.html');


async function creatResultFolder(){
  await fs.mkdir(pathToResultFiles, {recursive: true}); 
}

async function assembleStylesFiles(){     
  const files = await fs.readdir(pathToStylesFiles, {withFileTypes: true});
  const styleArr = [];

  for(let file of files) {
    const pathToCurrentFile = path.join(pathToStylesFiles, file.name);
    const fileExtantion = path.extname(pathToCurrentFile.toLowerCase());

    if(file.isFile() && fileExtantion === '.css'){
      const fileContent = await fs.readFile(pathToCurrentFile, 'utf8');
      styleArr.push(`${fileContent}\n`);
    }
  }
  await fs.writeFile(path.join(pathToResultFiles, 'style.css'), styleArr.join(''));
}

async function copyFolder(currentDir, destinationDir){
  const files = await fs.readdir(currentDir, { withFileTypes: true });

  await fs.rm(destinationDir, {recursive: true});
  await fs.mkdir(destinationDir, {recursive: true});  
  
  files.forEach(async (file) => {
    const currentFilePath = path.join(currentDir, file.name);
    const pathToFileCopyDir = path.join(destinationDir, file.name);

    if(file.isDirectory()) {
      await copyFolder(currentFilePath, pathToFileCopyDir);
    } else {
      await fs.copyFile(currentFilePath, pathToFileCopyDir);
    }   
  });
}

async function addHTMLFile(){
  let HTMLTemplate = await fs.readFile(pathToHTMLTemplate, 'utf8');
  const HTMLComponents = await fs.readdir(pathToHTMLFiles, {withFileTypes: true});

  for(let file of HTMLComponents) {
    const pathToCurrentFile = path.join(pathToHTMLFiles, file.name);
    const fileExtantion = path.extname(pathToCurrentFile.toLowerCase());

    if(file.isFile() && fileExtantion === '.html'){
      let data = await fs.readFile(pathToCurrentFile, 'utf8');
      let fileName = new RegExp(`{{${file.name.split('.').shift()}}}`, 'g');
      HTMLTemplate = HTMLTemplate.replace(fileName, data);
      fs.writeFile(pathToResultHTML, HTMLTemplate);
    }
  }
}

try {
  creatResultFolder();
  assembleStylesFiles();
  copyFolder(pathToAssetsFiles, pathToResultAssets);
  addHTMLFile();
} catch (err) {
  console.error(err);
}