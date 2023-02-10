import {
  Array,
  Program as _Program,
  Property,
  Specification as _Specification,
  Value,
} from "./Type";
import { Is } from "./Is";

export type ShallowCallback = (p: Property, v: Value, o: Value) => Value;

export function shallowVisitor(
  object: Value,
  callback: ShallowCallback
): Value {
  return (
    Is.Array(object)
      ? (object as Array<Value>)
      : Is.Map(object)
      ? Object.entries(object)
      : [undefined]
  ).map((v: Value, p: Property) => callback(p, v, object));
}

export type DeepCallback = (ps: Property[], v: Value, o: Value) => Value;

export function deepVisitor(object: Value, callback: DeepCallback): Value {
  function recursiveDeepVisitor(
    properties: Property[],
    object: Value,
    callback: DeepCallback,
    root: Value,
    size: number
  ) {
    properties = properties.slice(0, size);
    const result = shallowVisitor(object, (p: Property, v: Value, _: Value) => {
      if (Is.Undefined(p)) return v;
      properties[size] = p;
      return recursiveDeepVisitor(properties, v, callback, object, size + 1);
    });
    properties = properties.slice(0, size);
    return callback(properties, result, root);
  }
  return recursiveDeepVisitor([], object, callback, object, 0);
}
