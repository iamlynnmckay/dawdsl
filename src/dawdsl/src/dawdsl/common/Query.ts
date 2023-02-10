import {
  Array,
  Key,
  Object,
  Program,
  Index,
  Property,
  Specification,
  Value,
} from "./Type";
import { Is } from "./Is";
import { DeepCallback, deepVisitor } from "./Visitor";

export function shallowQuery(
  keys: Key[],
  object: Object<Value>,
  callback: DeepCallback
): Value {
  function shallowQueryRecursive(
    keys: Key[],
    object: Value,
    callback: DeepCallback,
    properties: Property[],
    root: Object<Value>,
    size: Index
  ): Value {
    if (keys.length === 0) {
      return callback(properties, object, root);
    } else if (Is.Array(object)) {
      return object.map((value: Value, index: Index) => {
        properties[size] = index;
        return shallowQueryRecursive(
          keys,
          value,
          callback,
          properties,
          root,
          size + 1
        );
      });
    } else if (Is.Map(object)) {
      const property = keys.shift() as Property;
      properties[size] = property;
      const value = object[property];
      return shallowQueryRecursive(
        keys,
        value,
        callback,
        properties,
        root,
        size + 1
      );
    } else {
      // @@@TODO: error
    }
  }
  return shallowQueryRecursive(keys, object, callback, [], object, 0);
}
export function deepQuery(
  specification: Specification.Value,
  program: Program.Value
): Program.Value {
  return deepVisitor(
    specification,
    (keys: Property[], value: Value, _: Value) => {
      if (Is.Function(value)) {
        return shallowQuery(
          keys as Key[],
          program as Object<Value>,
          value as DeepCallback
        );
      } else {
        return value;
      }
    }
  );
}
