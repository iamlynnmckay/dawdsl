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


    expression = expression.replace(
      /String\(.*\)|Number\(.*\)|\W+|\w+/g,
      (token: string): string => {
        if (Calculator.RESERVED_OPERATORS.includes(token)) {
          return token;
        } else if (Calculator.MATH_RESERVED_KEYWORDS.includes(token)) {
          return `Math.${token}`;
        } else if (Object.keys(this.functors).includes(token)) {
          return `_.${token}`;
        } else {

          /*
          
          
          ERROR: you need to allow for function arguments, either use '$1' or '_1' whichever feels nicer, maybe '$1' as it corresponds to bash
          
          
          
          
          */

          console.log(token)
          Assert.true(
            token.match(/String\(.*\)/) !== null || token.match(/Number\(.*\)/) !== null || token.match(/\w+/) !== null)
          return token
        }
      }
    );
    return new Function(`((_)=>(${expression}))`)(this.functors);
  }
}
