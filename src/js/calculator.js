const buttons = document.querySelectorAll('button');
const inputDisplay = document.querySelector('#input-display');
const historyExpressions = document.querySelector('#history-expressions');

const operators = ['+', '-', '*', '/'];
let repeatedOperators = [];
const valuesButton = [
  'C', '(', ')', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'x', '0', '.', '=',
]

buttons.forEach((button, i) => { button.value = valuesButton[i] });
operators.forEach(operator1 => {
  operators.forEach(operator2 => {
    repeatedOperators.push(`${operator1}${operator2}`)
  })
})

buttons.forEach(button => {
  button.addEventListener('click', () => getCharacter(button.value));
})

function getCharacter(digit) {
  if (inputDisplay.value === '0' && !operators.find(op => op === digit) && digit !== 'C') {
    inputDisplay.value = digit;
  } else if (digit === 'C') {
    inputDisplay.value = '0';
  } else {
    inputDisplay.value += digit;
  }

  checkCharacter(inputDisplay.value, digit);
}

function checkCharacter(stringValue, digit) {
  const inputDisplayArr = stringValue.split('');

  if (repeatedOperators.find(op => op === stringValue.slice(-2))) {
    inputDisplayArr.splice(-2, 1);
    inputDisplay.value = inputDisplayArr.join('');
    latestOperators = '';
  }

  if (digit === '=') {
    inputDisplayArr.splice(-1, 1);

    solve(inputDisplayArr.join(''));
  }

  if (digit === 'x') {
    inputDisplayArr.pop();
    inputDisplayArr.pop();
    inputDisplay.value = inputDisplayArr.join('');
  }
}

function solve(expression) {
  let result = eval(expression);

  if (typeof result === 'number' && !Number.isInteger(result)) {
    result = result.toFixed(5);
  }

  inputDisplay.value = result;
  historyExpressions.value = `${expression} = `;
}
