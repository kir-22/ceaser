const alphabetUpper = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
const alphabetLower = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
const otherSymbols = [
  ' ',
  ',',
  '.',
  ':',
  ';',
  '!',
  '?',
  '-',
  '_',
  '=',
  '+',
  '(',
  ')',
  '[',
  ']',
  '@',
  '`',
  "'",
  '"',
  '<',
  '>',
  '|',
  '/',
  '%',
  '$',
  '^',
  '&',
  '*',
  '~'
];
function ceaserEncode(string, shift, actions) {
  console.log('actions: ', actions);
  if (!string) return '';
  const _alphabetUpper = [
    ...alphabetUpper.slice(-shift),
    ...alphabetUpper.slice(0, alphabetUpper.length - shift)
  ];
  const _alphabetLower = [
    ...alphabetLower.slice(-shift),
    ...alphabetLower.slice(0, alphabetLower.length - shift)
  ];
  const stringData = string.split('');
  const result = [];
  if (actions === 'encode') {
    stringData.forEach(el => {
      if (otherSymbols.includes(el)) result.push(el);
      else if (el.charCodeAt(0) < 91 && el.charCodeAt(0) > 64) {
        const position = alphabetUpper.findIndex(element => element === el);
        result.push(_alphabetUpper[position]);
      } else if (el.charCodeAt(0) < 123 && el.charCodeAt(0) > 96) {
        const position = alphabetLower.findIndex(element => element === el);
        result.push(_alphabetLower[position]);
      }
    });
  } else {
    stringData.forEach(el => {
      if (otherSymbols.includes(el)) result.push(el);
      else if (el.charCodeAt(0) < 91 && el.charCodeAt(0) > 64) {
        const position = _alphabetUpper.findIndex(element => element === el);
        result.push(alphabetUpper[position]);
      } else if (el.charCodeAt(0) < 123 && el.charCodeAt(0) > 96) {
        const position = _alphabetLower.findIndex(element => element === el);
        result.push(alphabetLower[position]);
      }
    });
  }
  return result.join('');
}

module.exports = ceaserEncode;
