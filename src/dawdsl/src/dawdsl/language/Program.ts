import * as Common from "./Common";
export type Array = Value[];
export type Boolean = Common.Boolean;
export type Complex = Value[] | Map;
export type Index = Common.Index;
export type Key = Common.Key;
export type Map = Common.Map<Value>;
export type Null = Common.Null;
export type Number = Common.Number;
export type Simple = boolean | Null | number | string;
export type String = Common.String;
export type Value = Value[] | Map | Simple;
export type Program = Value;
export class Type {
  static Array = Common.Type.Array<Array, Value>;
  static Boolean = Common.Type.Boolean<boolean, Value>;
  static Complex = (a: Value) => Type.Array(a) || Type.Map(a);
  static Index = Common.Type.Index<Index, Value>;
  static Key = Common.Type.Key<Key, Value>;
  static Map = Common.Type.Map<Map, Value>;
  static Null = Common.Type.Null<Null, Value>;
  static Number = Common.Type.Number<number, Value>;
  static String = Common.Type.String<string, Value>;
  static Simple = (a: Value) =>
    Type.Boolean(a) || Type.Null(a) || Type.Number(a) || Type.String(a);
  static Value = Common.Type.Value<Value>;
  static Program = Type.Value;
  static is = Common.Type.is<Value>();
}
