import * as Common from "./Common";
import * as Program from "./Program";
export type Boolean = Common.Boolean;
export type Callback = (
  _1: Program.Key[],
  _2: Program.Value,
  _3: Program.Program
) => Program.Value;
export type Complex = Map;
export type Index = Common.Index;
export type Key = Common.Key;
export type Map = Common.Map<Value>;
export type Number = Common.Number;
export type String = Common.String;
export type Value = Map | Callback;
export type Specification = Value;
export class Type {
  static Boolean = Common.Type.Boolean<boolean, Value>;
  static Callback = (a: Value): a is Callback => typeof a === "function";
  static Index = Common.Type.Index<Index, Value>;
  static Key = Common.Type.Key<Key, Value>;
  static Map = Common.Type.Map<Map, Value>;
  static Number = Common.Type.Number<number, Value>;
  static String = Common.Type.String<string, Value>;
  static Value = Common.Type.Value<Value>;
  static Complex = Type.Map;
  static Specification = Type.Value;
  static is = Common.Type.is<Value>();
}
