const fs = require('fs');
const path = require('path');
const ceaser = require('./ceasier');

function translate(shift, input, output, actions) {
  // console.log('actions: ', actions);
  // console.log('output: ', output);
  // console.log('input: ', input);
  // console.log('shift: ', shift);
  // const stream = new fs.ReadStream(path.join(__dirname, input), { encoding: 'utf-8' });
  const stream = fs.createReadStream(path.join(__dirname, input), 'utf-8');
  const writeStream = fs.createWriteStream(path.join(__dirname, output), {
    flags: 'a+'
  });
  // stream.on('readable', () => {
  //   const data = stream.read();
  //   console.log('data: ', ceaser(data, shift, actions));
  // });
  stream.on('data', data => {
    // console.log('Данные получены');
    // console.log('data: ', ceaser(data, shift, actions));
    const _data = ceaser(data, shift, actions);
    writeStream.write(`${_data}\n`);
    writeStream.end();
  });
  writeStream.on('finish', () => {
    console.log('The data is writed!');
    process.exitCode = 2;
    process.on('exit', code => {
      console.log(`About to exit with code: ${code}`);
    });
  });

  stream.on('end', () => {
    console.warn('The end');
  });
  stream.on('error', err => {
    if (err.code === 'ENOENT') {
      process.exitCode = 1;
      process.stderr.write('Файла ненайден!\t');
      process.on('exit', code => {
        console.log(`About to exit with code: ${code}`);
      });
    } else {
      console.error(err);
    }
  });
}

module.exports = translate;
