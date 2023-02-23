export class Calculator {
  private static readonly PRECEDENCE: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "&": 3,
    "|": 4,
    "^": 5,
    "<<": 6,
    ">>": 6,
    ">>>": 6,
    ">": 7,
    "<": 7,
    ">=": 7,
    "<=": 7,
    "==": 7,
    "!=": 7,
    "&&": 8,
    "||": 9,
  };
  private static readonly ZERO_ARITY_OPERATORS: {
    [key: string]: () => number;
  } = {
    random: Math.random,
    E: () => Math.E,
    LN2: () => Math.LN2,
    LN10: () => Math.LN10,
    LOG2E: () => Math.LOG2E,
    LOG10E: () => Math.LOG10E,
    PI: () => Math.PI,
    SQRT1_2: () => Math.SQRT1_2,
    SQRT2: () => Math.SQRT2

  }
  private static readonly UNARY_OPERATORS: {
    [key: string]: (a: number) => number;
  } = {
    "+": (a) => a,
    "-": (a) => -a,
    "~": (a) => ~a,
    "!": (a) => Number(!a),
    "+u": (a) => +a,
    "-u": (a) => -a,

    abs: Math.abs,
    acos: Math.acos,
    acosh: Math.acosh,
    asin: Math.asin,
    asinh: Math.asinh,
    atan: Math.atan,

    atanh: Math.atanh,
    cbrt: Math.cbrt,
    ceil: Math.ceil,
    clz32: Math.clz32,
    cos: Math.cos,
    cosh: Math.cosh,
    exp: Math.exp,
    expm1: Math.expm1,
    floor: Math.floor,
    fround: Math.fround,
    hypot: Math.hypot,
    
    "log": Math.log,
    log10: Math.log10,
    log1p: Math.log1p,
    log2: Math.log2,
    round: Math.round,
    sign: Math.sign,
    sin: Math.sin,
    sinh: Math.sinh,
    sqrt: Math.sqrt,
    tan: Math.tan,
    tanh: Math.tanh,
    trunc: Math.trunc,
  };
  private static readonly BINARY_OPERATORS: {
    [key: string]: (a: number, b: number) => number;
  } = {
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    imul: Math.imul,
    atan2: Math.atan2,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
    "&": (a, b) => a & b,
    "|": (a, b) => a | b,
    "^": (a, b) => a ^ b,
    "<<": (a, b) => a << b,
    ">>": (a, b) => a >> b,
    ">>>": (a, b) => a >>> b,
    ">": (a, b) => (a > b ? 1 : 0),
    "<": (a, b) => (a < b ? 1 : 0),
    ">=": (a, b) => (a >= b ? 1 : 0),
    "<=": (a, b) => (a <= b ? 1 : 0),
    "==": (a, b) => (a === b ? 1 : 0),
    "!=": (a, b) => (a !== b ? 1 : 0),
    "&&": (a, b) => (a && b ? 1 : 0),
    "||": (a, b) => (a || b ? 1 : 0),
  };


  public static evaluate(
    expression: string,
    functions?: { [_: string]: number | ((...as: number[]) => number) }
  ): number {
    return Calculator.newCalculate(expression)
  }
  private static newCalculate(expression: string): number {
 let binaryOperators = Calculator.BINARY_OPERATORS
 let unaryOperators = Calculator.UNARY_OPERATORS
  // remove whitespace from the expression
  expression = expression.replace(/\s+/g, ' ');

  // convert the expression into an array of tokens
  const tokens = expression.split(' ');

  // create stacks for operators and operands
  let operators: string[] = [];
  let operands: number[] = [];

  // define a function to evaluate a binary operation
  function evaluate() {
    const operator = binaryOperators[operators.pop()!];
    const operand2 = operands.pop()!;
    const operand1 = operands.pop()!;
    const result = operator(operand1, operand2);
    operands.push(result);
  }

  // loop through the tokens
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
  
    if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators[operators.length - 1] !== '(') {
        evaluate();
      }
      operators.pop();
    } else if (token in binaryOperators) {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        evaluate();
      }
      operators.push(token);
    } else if (token in unaryOperators) {
      console.log(token)
      const previousToken = i === 0 ? null : tokens[i - 1];
      if (previousToken === null || previousToken === '(' || previousToken in binaryOperators) {
        const operand = operands.pop()!;
        const result = unaryOperators[token](operand);
        operands.push(result);
      } else {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          evaluate();
        }
        operators.push(token);
      }
    } else {
      operands.push(parseFloat(token));
    }
  }

  // evaluate any remaining operators
  while (operators.length > 0) {
    evaluate();
  }

  // the result is the last element in the operands stack
  return operands.pop()!;
  }
}
