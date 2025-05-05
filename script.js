let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-digit")) {
      handleDigit(button.getAttribute("data-digit"));
    } else if (button.getAttribute("data-action") === "clear") {
      clear();
    } else {
      handleOperator(button.getAttribute("data-action"));
    }
  });
});

function handleDigit(digit) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = digit;
    shouldResetDisplay = false;
  } else {
    display.textContent += digit;
  }
}

function handleOperator(operator) {
  if (operator === "=") {
    if (firstNumber !== null && currentOperator !== null && !shouldResetDisplay) {
      secondNumber = parseFloat(display.textContent);
      const result = operate(currentOperator, firstNumber, secondNumber);
      display.textContent = result;
      firstNumber = result;
      currentOperator = null;
      shouldResetDisplay = true;
    }
    return;
  }

  if (currentOperator !== null && !shouldResetDisplay) {
    secondNumber = parseFloat(display.textContent);
    const result = operate(currentOperator, firstNumber, secondNumber);
    display.textContent = result;
    firstNumber = result;
  } else {
    firstNumber = parseFloat(display.textContent);
  }

  currentOperator = operator;
  shouldResetDisplay = true;
}

function clear() {
  display.textContent = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

function operate(operator, a, b) {
  if (operator === "+") return round(a + b);
  if (operator === "-") return round(a - b);
  if (operator === "*") return round(a * b);
  if (operator === "/") {
    if (b === 0) {
      return "Nice try";
    }
    return round(a / b);
  }
  return b;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}
