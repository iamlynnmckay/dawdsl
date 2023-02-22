import { TypeOf } from "./TypeOf";
import { Any } from "./Any";

export type ShallowCallback = (p: string | number, v: Any, o: Any) => Any;

export type DeepCallback = (ps: (string | number)[], v: Any, o: Any) => Any;

export class Visitor {
  static shallowVisitor(object: Any, callback: ShallowCallback): Any {
    if (TypeOf.Array(object)) {
      return object.map((v: Any, p: number) =>
        TypeOf.Undefined(v) ? v : callback(p, v, object)
      );
    } else if (TypeOf.Object(object)) {
      return Object.entries(object).map(([p, v]: [string, Any]) =>
        TypeOf.Undefined(v) ? v : callback(p, v, object)
      );
    } else {
      return object;
    }
  }

  static deepVisitor(object: Any, callback: DeepCallback): Any {
    function recursiveDeepVisitor(
      properties: (string | number)[],
      object: Any,
      callback: DeepCallback,
      root: Any,
      size: number
    ): Any {
      properties = properties.slice(0, size);
      const result = Visitor.shallowVisitor(
        object,
        (p: string | number, v: Any, _: Any) => {
          if (TypeOf.Undefined(p)) return v;
          properties[size] = p;
          return recursiveDeepVisitor(
            properties,
            v,
            callback,
            object,
            size + 1
          );
        }
      );
      properties = properties.slice(0, size);
      return callback(properties, result, root);
    }
    return recursiveDeepVisitor([], object, callback, object, 0);
  }
}
