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
// console.log(add(a,b), 
//         subtract(a,b), 
//         multiply(a,b), 
//         divide(a,b));

console.log(operate("^", 2, 4));