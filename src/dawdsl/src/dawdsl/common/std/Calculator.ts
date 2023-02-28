import { Any } from "./Any";
import { Assert } from "./Assert";

export type Functor = string | number | ((...tokens: Functor[]) => Functor);
export type Functors = { [_: string]: Functor };
export class Calculator {
  private static readonly DEFAULT_RESERVED_KEYWORDS = ["String", "Number"];
  private static readonly MATH_RESERVED_KEYWORDS =
    Object.getOwnPropertyNames(Math);
  private static readonly ALL_RESERVED_KEYWORDS =
    Calculator.DEFAULT_RESERVED_KEYWORDS.concat(
      Calculator.MATH_RESERVED_KEYWORDS
    );
  private static readonly RESERVED_OPERATORS = [
    "!",
    "!=",
    "%",
    "&",
    "&&",
    "(",
    ")",
    "*",
    "+",
    "+u",
    ",",
    "-",
    "-u",
    "/",
    "<",
    "<<",
    "<=",
    "==",
    "=>",
    ">",
    ">=",
    ">>",
    ">>>",
    "[",
    "]",
    "^",
    "|",
    "||",
    "~",
    "(",
    ")",
  ];
  private functors;
  constructor(functors: Functors) {
    this.functors = functors;
    // no keywords
    Assert.false(
      Object.keys(functors)
        .map((f) => Calculator.ALL_RESERVED_KEYWORDS.includes(f))
        .includes(true)
    );
    // no invalid functor names
    Assert.false(
      Object.keys(functors)
        .map((f) => f.match(/\W+/) === null)
        .includes(false)
    );
  }

  public eval(expression: string): Any {
    expression = expression.replace(/\s+/gm, "");
    expression = expression.replace(
      /".*"/gm,
      (token: string) => `String(${token})`
    );
    expression = expression.replace(
      /[1-9][0-9]*(.[0-9]+)?/g,
      (token: string) => `Number(${token})`
    );
    let error = false;
    expression = expression.replace(
      /String\(.*\)|Number\(.*\)|\$[1-9][0-9]*|\W+|\w+/g,
      (token: string): string => {
        if (Calculator.RESERVED_OPERATORS.includes(token)) {
          return token;
        } else if (Calculator.MATH_RESERVED_KEYWORDS.includes(token)) {
          return `Math.${token}`;
        } else if (Object.keys(this.functors).includes(token)) {
          return `_.${token}`;
        } else if (token.match(/\$[1-9][0-9]*/) !== null) {
          return token;
        } else {
          error = true;
          return "";
        }
      }
    );
    if (!error) {
      return new Function(`((_)=>(${expression}))`)(this.functors);
    } else {
      return () => undefined;
    }
  }
}
