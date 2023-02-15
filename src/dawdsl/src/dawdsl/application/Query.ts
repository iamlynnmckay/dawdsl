import { Value, Module } from "./Type";
import { TypeOf, Any } from "../std";
import { Visitor } from "../std/Visitor";

type Key = string;
type Index = number;
type Property = Key | Index;

export type DeepCallback = (ps: Property[], v: Value, o: Value) => Value;

export class Query {
  static shallowQuery(
    keys: Key[],
    object: Value,
    callback: DeepCallback
  ): Value {
    function shallowQueryRecursive(
      keys: Key[],
      object: Value,
      callback: DeepCallback,
      properties: Property[],
      root: Value,
      size: Index
    ): Value {
      if (keys.length === 0) {
        if (TypeOf.Array(object)) {
          return (object as Array<Value>).map((value: Value, index: Index) => {
            properties[size] = index;
            return callback(properties, value, root);
          });
        } else {
          return callback(properties, object, root);
        }
      } else if (TypeOf.Array(object)) {
        return (object as Array<Value>).map((value: Value, index: Index) => {
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
      } else if (TypeOf.Object(object)) {
        const property = keys.shift() as Property;
        properties[size] = property;
        object = object as { [_: string]: Value };
        const value = object[property];
        object[property] = shallowQueryRecursive(
          keys,
          value,
          callback,
          properties,
          root,
          size + 1
        );
        return object;
      } else {
        return undefined;
      }
    }
    return shallowQueryRecursive(keys, object, callback, [], object, 0);
  }
  static deepQuery(specification: Module, program: Value): Value {
    Visitor.deepVisitor(
      specification,
      (keys: Property[], value: Module, _: Module): Any => {
        if (typeof value === "function") {
          program = Query.shallowQuery(
            keys as Key[],
            program,
            value as DeepCallback
          );
        } else {
          return undefined;
        }
      }
    );
    return program;
  }
}
