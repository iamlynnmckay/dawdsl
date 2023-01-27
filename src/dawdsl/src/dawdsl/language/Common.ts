export type Array<Value> = Value[];
export interface Map<Value> {
  [_: Key]: Value;
}
export type Boolean = boolean;
export type Index = number;
export type Key = string;
export type Null = null;
export type Property = Key | Index
export type Number = number;
export type String = string;
export type Callback<_Value> = ( _1: Key[], _2: _Value, _3: _Value) => _Value;
export class Type {
  static Array = <_Array extends _Value, _Value>(a: _Value): a is _Array =>
    Array.isArray(a);
  static Boolean = <_Boolean extends _Value, _Value>(
    a: _Value
  ): a is _Boolean => typeof a === "boolean";
  static Index = <_Index extends _Value, _Value>(a: _Value): a is _Index =>
    Type.Number(a) && Math.round(a as number) === a && a > 0;
  static Key = <_Key extends _Value, _Value>(a: _Value): a is _Key =>
    Type.String(a);
  static Map = <_Map extends _Value, _Value>(a: _Value): a is _Map =>
    typeof a === "object" && !Type.Array(a) && !Type.Null(a);
  static Null = <_Null extends _Value, _Value>(a: _Value): a is _Null =>
    a === null;
  static Number = <_Number extends _Value, _Value>(a: _Value): a is _Number =>
    typeof a === "number";
  static String = <_String extends _Value, _Value>(a: _Value): a is _String =>
    typeof a === "string";
  static Value = <_Value>(a: _Value): a is _Value => true;
  static is =
    <_Value>(): (<_Any extends _Value>(
      a: _Value,
      f: (a: _Value) => a is _Any
    ) => boolean) =>
    <_Any extends _Value>(a: _Value, f: (a: _Value) => a is _Any): boolean =>
      f(a) ? true : false;
}
