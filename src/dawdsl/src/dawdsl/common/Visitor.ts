import { Any } from "./Any";
import { Type } from "./Type";

export class Visitor {
  static #shallowIterator(object: Any, callback: Any): Any {
    if (Type.array(object)) {
      return (object as Array<Any>).map((value: Any, key: number) => {
        return callback(key, value, object);
      });
    } else if (Type.object(object)) {
      return Object.entries(object).map(([key, value]: [string, Any]) => {
        return callback(key, value, object);
      });
    } else {
      return callback(undefined, object, object);
    }
  }
  static #recursiveDeepIterator(
    keys: Any,
    object: Any,
    callback: Any,
    root: Any,
    size: number
  ) {
    keys = keys.slice(0, size);
    keys.push(-1);
    const result = Visitor.#shallowIterator(
      object,
      (key: Any, value: Any, _: Any) => {
        if (key === undefined) {
          return value;
        } else {
          keys[size] = key;
          return Visitor.#recursiveDeepIterator(
            keys,
            value,
            callback,
            object,
            size + 1
          );
        }
      }
    );
    keys = keys.slice(0, size);
    return callback(keys, result, root);
  }
  static #deepIterator(object: Any, callback: Any): Any {
    return this.#recursiveDeepIterator([], object, callback, object, 0);
  }
  static #recursiveByArrayOfPropertiesIterator(
    properties: Any,
    object: Any,
    callback: Any,
    keys: Any,
    root: Any
  ): Any {
    if (properties.length === 0) {
      return callback(keys, object, root);
    } else {
      const property = properties.shift();
      keys.push(property);
      if (Type.undefined(object)) {
        console.log("HERE ", properties, keys);
      } else if (Type.array(object[property])) {
        keys.push();
        return object[property].map((value: Any, index: Any) => {
          keys[keys.length] = index;
          return Visitor.#recursiveByArrayOfPropertiesIterator(
            properties,
            value,
            callback,
            keys,
            root
          );
        });
      } else {
        return Visitor.#recursiveByArrayOfPropertiesIterator(
          properties,
          object[property],
          callback,
          keys,
          root
        );
      }
    }
  }
  static #byArrayOfPropertiesIterator(
    properties: Any,
    object: Any,
    callback: Any
  ): Any {
    return Visitor.#recursiveByArrayOfPropertiesIterator(
      properties,
      object,
      callback,
      [],
      object
    );
  }
  static #byObjectOfNestedCallbacksIterator(callbacks: Any, object: Any) {
    return Visitor.#deepIterator(
      callbacks,
      (keys: Any, callback: Any, _: Any) => {
        if (Type.function(callback)) {
          return Visitor.#byArrayOfPropertiesIterator(keys, object, callback);
        } else {
          return callback;
        }
      }
    );
  }
  static #byArrayOfObjectsOfNestedCallbacksIterator(
    callbacks: Any,
    object: Any
  ) {
    return callbacks.reduce((value: Any, context: Any) => {
      return Visitor.#byObjectOfNestedCallbacksIterator(context, value);
    }, object);
  }
  static #depthFirstSearch(graph: Any): Any {
    const f = (current: Any, visited: Any, stack: Any) => {
      graph[current].forEach((neighbor: Any) => {
        f(neighbor, visited, stack);
      });
      stack.push(current);
    };
    const stack: Array<string> = [];
    const visited = new Set();
    Object.entries(graph).forEach(([vertex, _]: [string, Any]) => {
      if (!visited.has(vertex)) {
        f(vertex, visited, stack);
      }
    });
    return stack;
  }
  static #dependentObjectsAsGraph(
    objects: Any,
    dependsOnProperty: string,
    dependencyOfProperty: string
  ): Any {
    const graph: { [key: string]: string[] } = {};
    const asArray = (keyOrKeys: Any) =>
      Type.undefined(keyOrKeys)
        ? []
        : Type.array(keyOrKeys)
        ? keyOrKeys
        : [keyOrKeys];
    Object.entries(objects).forEach(([key, value]: [string, Any]) => {
      asArray(value[dependsOnProperty]).forEach((before: Any) => {
        const predecessor = objects[before][dependencyOfProperty];
        if (!Type.undefined(predecessor)) {
          const afterOfBefore = asArray(predecessor);
          afterOfBefore.push(key);
          objects[before][dependencyOfProperty] = afterOfBefore;
        }
      });
    });
    Object.entries(objects).forEach(([key, value]: [string, Any]) => {
      graph[key] = asArray(value[dependencyOfProperty]);
    });
    return graph;
  }
  static #dependentObjectsAsArrayOfValues(
    objects: Any,
    dependsOnProperty: string,
    depencyOfProperty: string,
    definitionProperty: string
  ): Any {
    return Visitor.#depthFirstSearch(
      Visitor.#dependentObjectsAsGraph(
        objects,
        dependsOnProperty,
        depencyOfProperty
      )
    ).map((key: Any) => objects[key][definitionProperty]);
  }
  static #arrayOfNamedObjectsToObject(array: Any, nameProperty: string) {
    const result: { [key: string]: Any } = {};
    array.forEach((o: Any) => (result[o[nameProperty]] = o));
    return result;
  }
  static #buildVisitor(
    modules: Any,
    nameProperty: string,
    dependsOnProperty: string,
    depencyOfProperty: string,
    definitionProperty: string
  ) {
    return Visitor.#dependentObjectsAsArrayOfValues(
      Visitor.#arrayOfNamedObjectsToObject(modules, nameProperty),
      dependsOnProperty,
      depencyOfProperty,
      definitionProperty
    );
  }
  static #visitVisitor(visitor: Any, program: Any) {
    return Visitor.#byArrayOfObjectsOfNestedCallbacksIterator(visitor, program);
  }
  #visitor: Any;
  constructor(
    modules: Any,
    {
      nameProperty,
      dependsOnProperty,
      dependencyOfProperty,
      definitionProperty,
    }: {
      nameProperty: string;
      dependsOnProperty: string;
      dependencyOfProperty: string;
      definitionProperty: string;
    }
  ) {
    this.#visitor = Visitor.#buildVisitor(
      modules,
      nameProperty,
      dependsOnProperty,
      dependencyOfProperty,
      definitionProperty
    );
  }
  visit(program: Any) {
    return Visitor.#visitVisitor(this.#visitor, program);
  }
}
