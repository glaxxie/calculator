const [a,b] = [2,3]

const add       = (num1, num2) => num1 +  num2;
const subtract  = (num1, num2) => num1 -  num2;
const multiply  = (num1, num2) => num1 *  num2;
const divide    = (num1, num2) => num1 /  num2;
const exponent  = (num1, num2) => num1 ** num2;
//might need tweaking
const operate   = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2)
            break;
        case "*":
            return multiply(num1, num2)
            break;
        case "/":
            return divide(num1, num2)
            break;
        case "^":
            return exponent(num1, num2)
        default:
            break;
    };
};

// setting variables
const display_box =  document.querySelector('#display');
const buttons = document.querySelectorAll('button');

//in order to limit number to len of 9 digits, split number and sign to 2 different var
let curValue = '';
let sign = '';
let operatorInStack = false;
let firstNum = secondNum = 0;

//helper functions
const displayFullValue = () => display_box.textContent = `${sign}${+curValue}`
const checkLen = numString => numString.length < 9;

const pressNumber = button => {
    if (checkLen(curValue)) {
        curValue += button.textContent;
        displayFullValue();
    }
}

const pressDecimal = button => {
    if (checkLen(curValue)) {
        if (curValue.includes('.')) button.disabled;
        else curValue+= ".";
        displayFullValue();
    }
}

const pressSign = () => {
    sign ? sign = "" : sign = "-";
    displayFullValue();
}
//2 buttons will clear the screen, but only clear remove the stacks and all values so far
const pressClear = button => {
    if (button.id === "clear") firstNum = secondNum = operatorInStack = 0;
    curValue = sign = operatorInStack = '';
    displayFullValue();
};

const pressEval = button => {
    //if no operator on the stack, firstNum is the current value. display current value

    //if there is operator on the stack. and second value not input yet. firstNum and secondNum is current value. current value is now firstNum

    //if there is operator on the stack. evaluate first and second with operate. current value is now firstNum

}

//
const pressOperator = button => {

}



buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        switch (button.className) {
            case "number":
                pressNumber(button);
                break;
            case "sign":
                pressSign();
                break;
            case "decimal":
                pressDecimal(button);
                break;
            case "eval":
                pressEval(button);
                break;
            case "operator":
                pressOperator(button);
                break;
            case "clear":
                pressClear(button);
                break;
            default:
                break;
        }
    });
});

