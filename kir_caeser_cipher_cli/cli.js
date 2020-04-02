const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const translate = require('./translate');
const ceaser = require('./ceasier');
// -s, --shift: a shift
// -i, --input: an input file
// -o, --output: an output file
// -a, --action: an action encode/decode
program
  .option('-s, --shift <type>', 'shift', '3')
  .option('-i, --input <type>', 'Input')
  .option('-o, --output <type>', 'output', undefined)
  .option('-a, --actions <type>', 'action')
  .parse(process.argv);
console.log(program.output, '<-----------');
if (program.actions === undefined) {
  process.stderr.write('Error: --actions is a required attribute');
} else {
  const { shift, input, output, actions } = program;
  if (!!shift && !!input && !!output && actions) {
    translate(shift, input, output, actions);
  }
  if (!input) {
    const stdin = process.openStdin();

    stdin.addListener('data', data => {
      console.log(`you entered: [${data.toString().trim()}]`);
      const _data = ceaser(
        data.toString().trim(),
        program.shift,
        program.actions
      );
      if (!program.output) {
        process.stdout.write(`Шифровка/Расшифровка: ${_data}\n`);
      } else {
        const writeStream = fs.createWriteStream(path.join(__dirname, output), {
          flags: 'a+'
        });
        writeStream.on('finish', () => {
          console.log('The data is writed!');
        });
        writeStream.write(`${_data}\n`);
        writeStream.end();
      }
    });
  } else if (!program.output) {
    const stream = fs.createReadStream(path.join(__dirname, input), 'utf-8');
    stream.on('data', data => {
      const _data = ceaser(data, shift, actions);
      process.stdout.write(`Шифровка/Расшифровка: ${_data}\n`);
      process.exitCode = 2;
      process.on('exit', code => {
        console.log(`About to exit with code: ${code}`);
      });
    });
  }
}
