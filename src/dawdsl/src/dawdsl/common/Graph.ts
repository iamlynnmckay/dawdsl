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

type PartiallyOrderedSinglyLinkedListElement<Value> = {
  after: Key[];
  key: Key;
  value: Value;
};
type PartiallyOrderedSinglyLinkedList<Value> = Array<
  PartiallyOrderedSinglyLinkedListElement<Value>
>;
type PartiallyOrderedDoublyLinkedListElement<Value> =
  PartiallyOrderedSinglyLinkedListElement<Value> & { before: Key[] };
type PartiallyOrderedDoublyLinkedList<Value> = Array<
  PartiallyOrderedDoublyLinkedListElement<Value>
>;
type PartiallyOrderedSinglyLinkedMapElement<Value> = {
  after: Key[];
  value: Value;
};
type PartiallyOrderedSinglyLinkedMap<Value> = {
  [_: Key]: PartiallyOrderedSinglyLinkedMapElement<Value>;
};
type PartiallyOrderedDoublyLinkedMapElement<Value> =
  PartiallyOrderedSinglyLinkedMapElement<Value> & { before: Key[] };
type PartiallyOrderedDoublyLinkedMap<Value> = {
  [_: Key]: PartiallyOrderedDoublyLinkedMapElement<Value>;
};
export type TotallyOrderedArray<Value> = Array<Value>;

export function asTotallyOrderedArray<Value>(
  a: PartiallyOrderedDoublyLinkedList<Value>
): TotallyOrderedArray<Value> {
  const depthFirstSearch = function (
    graph: PartiallyOrderedSinglyLinkedMap<Value>
  ): Array<Key> {
    const f = (current: Key, visited: Set<Key>, stack: Array<Key>) => {
      graph[current].after.forEach((neighbor: Key) => {
        f(neighbor, visited, stack);
      });
      stack.push(current);
    };
    const stack: Array<string> = [];
    const visited: Set<Key> = new Set();
    Object.entries(graph).forEach(
      ([vertex, _]: [Key, PartiallyOrderedSinglyLinkedMapElement<Value>]) => {
        if (!visited.has(vertex)) {
          f(vertex, visited, stack);
        }
      }
    );
    return stack;
  };
  return depthFirstSearch(a).map((k) => a[k].value);
}

export function asPartiallyOrderedDoublyLinkedMap<Value>(
  a: PartiallyOrderedDoublyLinkedList<Value>
): PartiallyOrderedDoublyLinkedMap<Value> {
  const d: PartiallyOrderedDoublyLinkedMap<Value> = {};
  return a.reduce((b, c) => {
    b[c.key] = { after: c.after, before: c.before, value: c.value };
    return b;
  }, d);
}

export function asPartiallyOrderedSinglyLinkedMap<Value>(
  a: PartiallyOrderedDoublyLinkedMap<Value>
): PartiallyOrderedSinglyLinkedMap<Value> {
  const b: PartiallyOrderedSinglyLinkedMap<Value> = {};
  Object.entries(a).forEach(
    ([key, element]: [
      string,
      PartiallyOrderedDoublyLinkedMapElement<Value>
    ]) => {
      b[key] = { after: element.after, value: element.value };
    }
  );
  Object.entries(a).forEach(
    ([key, element]: [
      string,
      PartiallyOrderedDoublyLinkedMapElement<Value>
    ]) => {
      element.before.forEach((before: Key) => {
        b[before].after.push(key);
      });
    }
  );
  return b;
}

export type DirectedAcyclicGraph<Value> =
  PartiallyOrderedDoublyLinkedList<Value>;
export function asArray<Value>(
  graph: DirectedAcyclicGraph<Value>
): Array<Value> {
  const a = asPartiallyOrderedDoublyLinkedMap(graph);
  const b = asPartiallyOrderedSinglyLinkedMap(a);
  const c = asTotallyOrderedArray(b);
  return c;
}
