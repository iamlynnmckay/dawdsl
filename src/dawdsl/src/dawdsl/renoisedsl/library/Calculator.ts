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
  private static readonly UNARY_OPERATORS: {
    [key: string]: (a: number) => number;
  } = {
    "+": (a) => a,
    "-": (a) => -a,
    "~": (a) => ~a,
    "!": (a) => Number(!a),
    "+u": (a) => +a,
    "-u": (a) => -a,
  };
  private static readonly BINARY_OPERATORS: {
    [key: string]: (a: number, b: number) => number;
  } = {
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

  private static readonly FUNCTIONS: {
    [_: string]: number | ((...as: number[]) => number);
  } = {
    abs: Math.abs,
    acos: Math.acos,
    acosh: Math.acosh,
    asin: Math.asin,
    asinh: Math.asinh,
    atan: Math.atan,
    atan2: Math.atan2,
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
    imul: Math.imul,
    log: Math.log,
    log10: Math.log10,
    log1p: Math.log1p,
    log2: Math.log2,
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    random: Math.random,
    round: Math.round,
    sign: Math.sign,
    sin: Math.sin,
    sinh: Math.sinh,
    sqrt: Math.sqrt,
    tan: Math.tan,
    tanh: Math.tanh,
    trunc: Math.trunc,
  };

  public static evaluate(
    expression: string,
    functions?: { [_: string]: number | ((...as: number[]) => number) }
  ): number {
    // @TODO: parenthesis do not seem to be implemented, use chat gpt to implement parenthesis
    // @TODO: allow functions to be passed as an object with functions and constants like in pitch.ts
    if (!functions) functions = Calculator.FUNCTIONS;
    const tokens = expression.split(/\s+/);
    const stack: number[] = [];
    const operatorStack: string[] = [];

    for (const token of tokens) {
      if (Calculator.isNumber(token)) {
        stack.push(parseFloat(token));
      } else if (Calculator.isUnaryOperator(token)) {
        const operand = stack.pop() as number;
        const operator = Calculator.UNARY_OPERATORS[token];
        const result = operator(operand);
        stack.push(result);
      } else if (Calculator.isBinaryOperator(token)) {
        while (
          operatorStack.length > 0 &&
          Calculator.PRECEDENCE[token] <=
            Calculator.PRECEDENCE[operatorStack[operatorStack.length - 1]]
        ) {
          const operator =
            Calculator.BINARY_OPERATORS[operatorStack.pop() as string];
          const rightOperand = stack.pop() as number;
          const leftOperand = stack.pop() as number;
          const result = operator(leftOperand, rightOperand);
          stack.push(result);
        }
        operatorStack.push(token);
      } else if (Object.keys(functions).includes(token)) {
        if (typeof functions[token] === "function") {
          const fn = functions[token] as (...as: number[]) => number;
          const args: number[] = [];
          const numArgs = fn.length;
          for (let i = 0; i < numArgs; i++) {
            args.push(stack.pop() as number);
          }
          args.reverse();
          const result = fn(...args);
          stack.push(result);
        } else {
          stack.push(functions[token] as number);
        }
      } else {
        // @TODO: error
      }
    }

    while (operatorStack.length > 0) {
      // @TODO: generalize to functions, same for precedence in general
      const operator =
        Calculator.BINARY_OPERATORS[operatorStack.pop() as string];
      const rightOperand = stack.pop() as number;
      const leftOperand = stack.pop() as number;
      const result = operator(leftOperand, rightOperand);
      stack.push(result);
    }

    return stack.pop() as number;
  }
  private static isNumber(token: string): boolean {
    return !isNaN(parseFloat(token));
  }

  private static isUnaryOperator(token: string): boolean {
    return Object.keys(Calculator.UNARY_OPERATORS).includes(token);
  }
  private static isBinaryOperator(token: string): boolean {
    return Object.keys(Calculator.BINARY_OPERATORS).includes(token);
  }
}
