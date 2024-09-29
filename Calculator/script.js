const result = document.getElementById('result');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentNumber = '0';
let previousNumber = '';
let operation = null;
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            inputNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            inputOperator(button.id);
        } else if (button.classList.contains('function')) {
            inputFunction(button.id);
        }
        updateDisplay();
    });
});

function inputNumber(number) {
    if (currentNumber === '0' || shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else {
        currentNumber += number;
    }
}

function inputOperator(op) {
    if (operation !== null) evaluate();
    previousNumber = currentNumber;
    operation = op;
    shouldResetScreen = true;
    updateHistory();
}

function inputFunction(func) {
    switch (func) {
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteNumber();
            break;
        case 'percent':
            percent();
            break;
        case 'plusMinus':
            plusMinus();
            break;
    }
}

function evaluate() {
    let computation;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentNumber = computation.toString();
    operation = null;
    updateHistory();
}

function clear() {
    currentNumber = '0';
    previousNumber = '';
    operation = null;
    history.textContent = '';
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber === '') currentNumber = '0';
}

function percent() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
}

function plusMinus() {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
}

function updateDisplay() {
    result.textContent = currentNumber;
}

function updateHistory() {
    history.textContent = `${previousNumber} ${getOperationSymbol(operation)}`;
}

function getOperationSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'subtract': return '−';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}
