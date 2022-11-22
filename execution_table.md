# Execution Table

curVal = ' ' (default: 0 whenconvert)
display = curVal 

| Stack        | Eval                          | Operation                    |
| :----------: | :---------------------------: | :--------------------------: |
| []           | => [N1 (curVAl)], curVal = '' | => [N1 (curVAl)]             |
| [N1]         | => [N1]                       | => [N1, nOp]                 |
| [N1, op]     | eval op(N1,N1) => [nN1]       | [N1,op].pop()=> [N1, nOp]    |
| [N1, op, N2] | eval op(N1,N2) => [nN1]       | eval op(N1,N2) => [nN1, nOp] |
|              |                               |                              |

After eval or operator, curVal to display is clear ''

| button    | affect to curVal / display                    |
| :-------: | :-------------------------------------------: |
| Num . +/- | curVal += e / update dspl                     |
| Eval      | curVal = "" / update dspl when stack.len > 1  |
| Clear     | curVal = "", stack clear / update dspl        |
| Backspace | curVal = "" / update dspl                     |
| Operator  | curVal = "" / update dspl when stack.len == 3 |
|           |                                               |