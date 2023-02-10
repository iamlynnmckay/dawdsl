import { Any } from "./Any";
import { _Function } from "./_Function";
export type Array<Value> = Value[];
export type Boolean = boolean;
export type Float = number;
export type Function = _Function;
export type Index = number;
export type Integer = number;
export type Key = string;
export interface Map<Value> {
  [_: Key]: Value;
}
export type Null = null;
export type Number = number;
export type Object<Value> = Value[] | Map<Value>;
export type Primitive = boolean | Integer | Float | string;
export type Property = Key | Index;
export type String = string;
export type Undefined = undefined;
export type Value =
  | Null
  | Function
  | Undefined
  | Primitive
  | Value[]
  | Map<Value>
  | Function;
//
export namespace Program {
  export type Value = Primitive | Null | Value[] | Map<Value>;
}
//
export namespace Specification {
  export type Callback = (_1: Key[], _2: Any, _3: Program.Value) => Any;
  export type Value = Map<Value> | Callback;
}
//
