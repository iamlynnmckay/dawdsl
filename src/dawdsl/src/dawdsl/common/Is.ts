import * as _Array from "./_Array";
import {
  Array,
  Boolean,
  Float,
  Index,
  Integer,
  Key,
  Map,
  Null,
  Number,
  Object,
  Primitive,
  Program as _Program,
  Property,
  Program,
  Specification as _Specification,
  String,
  Undefined,
  Value,
} from "./Type";

export class Is {
  static Array = (a: Value): a is Array<Value> => _Array.isArray(a);
  static Boolean = (a: Value): a is boolean => typeof a === "boolean";
  static Float = (a: Value): a is Float => Is.Number(a);
  static Function = (a: Value): a is Function => typeof a === "function";
  static Index = (a: Value): a is Index => Is.Integer(a) && a > 0;
  static Integer = (a: Value): a is Integer =>
    Is.Number(a) && Math.round(a as number) === a;
  static Key = (a: Value): a is Key => Is.String(a);
  static Map = (a: Value): a is Map<Value> =>
    typeof a === "object" && !Is.Array(a) && !Is.Null(a);
  static Null = (a: Value): a is Null => a === null;
  static Number = (a: Value): a is number => Is.Number(a);
  static Object = (a: Value): a is Object<Value> => Is.Map(a) || Is.Array(a);
  static Primitive = (a: Value): a is Primitive =>
    Is.Boolean(a) || Is.Number(a) || Is.Boolean(a);
  static Property = (a: Value): a is Property => Is.Key(a) || Is.Index(a);
  static String = (a: Value): a is string => typeof a === "string";
  static Undefined = (a: Value): a is Undefined => a === undefined;
  static Program = {
    Value: (a: Value): a is Program.Value =>
      Is.Primitive(a) || Is.Null(a) || Is.Object(a),
  };
  static Specification = {
    Callback: (a: Value): a is _Specification.Callback => Is.Function(a),
    Value: (a: Value): a is _Specification.Value => Is.Map(a) || Is.Function(a),
  };
}
