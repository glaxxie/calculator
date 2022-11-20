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
// let sign = '';
let opStack = [];
// let firstNum = secondNum = 0;
// let currentOperator = '';

//helper functions
const printDebug = () => {
    console.log(`Current val: ${curValue}`)
    console.log(`Current stack: ${opStack}`)
}
const refreshVars = (stack=false) => {
    if (stack) opStack.length = 0
    curValue = '';
} 
const displayFullValue = () => {
    // console.log(`curVal : ${curValue} type: ${typeof(curValue)} with len ${curValue.length}`)
    //TODO: need to fix display of float, +/- and choose a number len
    curValue.length >= 10 ? display_box.textContent = `err:toolarge`:
    display_box.textContent = `${+curValue}`;
}
const checkLen = numString => numString.length < 10;


//function for buttons
//passed
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
    curValue.includes("-") ? curValue = curValue.replace("-",'') :
    curValue = `-${+curValue}`
    // printDebug();
    displayFullValue();
}
//passes
//2 buttons will clear the screen, but only clear remove the stacks and all values so far
const pressClear = button => {
    if (button.id === "clear") refreshVars(true);
    refreshVars();
    displayFullValue();
    // printDebug();
};


// 
const pressEval = button => {
    if (opStack.length === 0) opStack.push(+curValue)
    else if (opStack.length === 1) { 
        //pass
    } else if (opStack.length === 2) {
        let firstNum    , 
            operator    ,
            secondNum   ;
        if (curValue === "") {
            
            [firstNum, operator, secondNum] = [+opStack[0],opStack[1],+opStack[0]];
            console.log(firstNum, operator, secondNum)
        } else {
            opStack.push(+curValue);
            [firstNum, operator, secondNum] = [...opStack];
            console.log(firstNum, operator, secondNum)
        }
        curValue = calculation(firstNum, operator, secondNum).toString()
        opStack.length = 0;
        opStack.push(curValue);
    }
    displayFullValue();
    // printDebug();
}


const pressOperator = button => {
    //if there is an operator on the stack. replace it
    const operator = button.textContent
    //when press add the current val to the stack
    //if last value in the stack is not a number. pop and add the new one
    if (opStack.length === 0) {
        opStack.push(+curValue,operator) //passes
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
    curValue = "";
    // sign = "";
    // printDebug();
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

