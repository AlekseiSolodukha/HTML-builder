const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const newFile = fs.createWriteStream(path.join(__dirname,'createdFile.txt'));

const writeIntoNewFile = () => {
  console.log('Hello, my dear friend! \nPlease, type something:');
  stdin.on('data', data => {
    data.toString().trim() === 'exit' ? exit() : newFile.write(data.toString());
    process.on('exit', () => {
      stdout.write('Good luck!');
      exit();
    });
    process.on('SIGINT', () => {
      exit();
    });
  });
};

writeIntoNewFile();