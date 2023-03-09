import { Any } from "./Any";
export class TypeOf {
  static Array = (a: Any): a is Array<Any> => Array.isArray(a);
  static Object = (a: Any): a is object =>
    typeof a === "object" && !TypeOf.Null(a);
  static Boolean = (a: Any): a is boolean => typeof a === "boolean";
  static Number = (a: Any): a is number => typeof a === "number";
  static Null = (a: Any): a is null => a === null;
  static String = (a: Any): a is string => typeof a === "string";
  static Undefined = (a: Any): a is undefined => a === undefined;
  // todo
  static Function = (a: Any): boolean => a === "function";
}
