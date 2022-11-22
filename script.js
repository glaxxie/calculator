const add       = (num1, num2) => (num1 +  num2)//.toFixed(3);
const subtract  = (num1, num2) => (num1 -  num2)//.toFixed(3);
const multiply  = (num1, num2) => (num1 *  num2)//.toFixed(3);
const divide    = (num1, num2) => (num1 /  num2)//.toFixed(3);
const exponent  = (num1, num2) => (num1 ** num2)//.toFixed(3);
//might need tweaking
const operate   = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2)
        case "*":
            return multiply(num1, num2)
        case "/":
            return divide(num1, num2)
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
let opStack = [];

//helper functions
const printDebug = () => {
    console.log(`Current val: ${curValue}`)
    console.log(`Current stack: ${opStack}`)
}
const refreshVars = (stack=false) => {
    if (stack) opStack.length = 0
    curValue = '';
} 
const displayFullValue = (result=false) => {
    console.log(curValue)
    if (result && curValue.length >= 10) {
        if (curValue.includes('.')) { //float
            curValue = Math.fround(curValue).toFixed(5)
            display_box.textContent = +curValue
        } else display_box.textContent = `error:BIG`
    } else display_box.textContent = `${sign}${+curValue}`;
}
const checkLen = numString => numString.length < 9;


//function for buttons
const calculation = (num1,op,num2) => {
    switch (op) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        case "*":
            return multiply(num1, num2)
        case "/":
            return divide(num1, num2)
        default:
            break;
    }
}

const pressNumber = button => {
    if (opStack.length === 1) {
        //clear method
        opStack.length = 0,
        curValue = '';
    }
    if (checkLen(curValue)) {
        curValue+= +(button.textContent);
    }
    // printDebug();
    displayFullValue();
}
//passed
const pressDecimal = button => {
    if (checkLen(curValue)) {
        if (curValue.includes('.')) button.disabled;
        else curValue+= ".";
    }
    // printDebug();
    displayFullValue();
}
//passed
const pressSign = () => {
    sign ? sign = "" : sign = '-' ;
    displayFullValue();
}
//passes
//2 buttons will clear the screen, but only clear remove the stacks and all values so far
const pressClear = button => {
    if (button.id === "clear") refreshVars(true);
    refreshVars();
    displayFullValue();
};


// 
const pressEval = button => {
    if (opStack.length === 0) {
        opStack.push(+(sign+curValue))
        console.log(opStack)
    }
    else if (opStack.length === 1) { 
        //pass
    } else if (opStack.length === 2) {
        let firstNum    , 
            operator    ,
            secondNum   ;
        if (curValue === "") {
            [firstNum, operator, secondNum] = [+opStack[0],opStack[1],+opStack[0]];
        } else {
            opStack.push(+(sign+curValue));
            [firstNum, operator, secondNum] = [...opStack];
        }
        sign = "";
        curValue = calculation(firstNum, operator, secondNum).toString()
        opStack.length = 0;
        opStack.push(curValue);
    }
    displayFullValue(true);
}


const pressOperator = button => {
    //if there is an operator on the stack. replace it
    const operator = button.textContent
    //when press add the current val to the stack
    //if last value in the stack is not a number. pop and add the new one
    if (opStack.length === 0) {
        opStack.push(+(sign+curValue),operator) //passes
    } else if (opStack.length === 1) {
        opStack.push(operator)          //passes
    } else if (opStack.length === 2) {
        if (curValue === "") {
            opStack[opStack.length - 1] = operator
        } else {
            pressEval();
            opStack.push(operator)
        }
    }
    curValue = sign = "";
}
//


//add event listner to buttons
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

///
document.addEventListener('keydown', (event) => {
    const btn = document.querySelector(`button[data-key="${event.key}"]`);
    switch (btn.className) {
        case "number":
                pressNumber(btn);
                break;
            case "sign":
                pressSign();
                break;
            case "decimal":
                pressDecimal(btn);
                break;
            case "eval":
                pressEval(btn);
                break;
            case "operator":
                pressOperator(btn);
                break;
            case "clear":
                pressClear(btn);
                break;
            default:
                break;
        }
    }
)