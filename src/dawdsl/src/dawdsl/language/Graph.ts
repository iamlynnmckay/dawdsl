import * as Common from "./Common";

export type PartiallyOrderedSinglyLinkedListElement<Value> = {
  after: Common.Key[];
  key: Common.Key;
  value: Value;
};
export type PartiallyOrderedSinglyLinkedList<Value> = Array<
  PartiallyOrderedSinglyLinkedListElement<Value>
>;
export type PartiallyOrderedDoublyLinkedListElement<Value> =
  PartiallyOrderedSinglyLinkedListElement<Value> & { before: Common.Key[] };
export type PartiallyOrderedDoublyLinkedList<Value> = Array<
  PartiallyOrderedDoublyLinkedListElement<Value>
>;
export type PartiallyOrderedSinglyLinkedMapElement<Value> = {
  after: Common.Key[];
  value: Value;
};
export type PartiallyOrderedSinglyLinkedMap<Value> = {
  [_: Common.Key]: PartiallyOrderedSinglyLinkedMapElement<Value>;
};
export type PartiallyOrderedDoublyLinkedMapElement<Value> =
  PartiallyOrderedSinglyLinkedMapElement<Value> & { before: Common.Key[] };
export type PartiallyOrderedDoublyLinkedMap<Value> = {
  [_: Common.Key]: PartiallyOrderedDoublyLinkedMapElement<Value>;
};
export type TotallyOrderedArray<Value> = Array<Value>;

export function asTotallyOrderedArray<Value>(
  a: PartiallyOrderedDoublyLinkedList<Value>
): TotallyOrderedArray<Value> {
  const b = asPartiallyOrderedDoublyLinkedMap(a);
  const c = asPartiallyOrderedSinglyLinkedMap(b);
  const depthFirstSearch = function (
    graph: PartiallyOrderedSinglyLinkedMap<Value>
  ): Array<Common.Key> {
    const f = (
      current: Common.Key,
      visited: Set<Common.Key>,
      stack: Array<Common.Key>
    ) => {
      graph[current].after.forEach((neighbor: Common.Key) => {
        f(neighbor, visited, stack);
      });
      stack.push(current);
    };
    const stack: Array<string> = [];
    const visited: Set<Common.Key> = new Set();
    Object.entries(graph).forEach(
      ([vertex, _]: [
        Common.Key,
        PartiallyOrderedSinglyLinkedMapElement<Value>
      ]) => {
        if (!visited.has(vertex)) {
          f(vertex, visited, stack);
        }
      }
    );
    return stack;
  };
  return depthFirstSearch(c).map((k) => c[k].value);
}

function asPartiallyOrderedDoublyLinkedMap<Value>(
  a: PartiallyOrderedDoublyLinkedList<Value>
): PartiallyOrderedDoublyLinkedMap<Value> {
  const d: PartiallyOrderedDoublyLinkedMap<Value> = {};
  return a.reduce((b, c) => {
    b[c.key] = { after: c.after, before: c.before, value: c.value };
    return b;
  }, d);
}

function asPartiallyOrderedSinglyLinkedMap<Value>(
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
      element.before.forEach((before: Common.Key) => {
        b[before].after.push(key);
      });
    }
  );
  return b;
}
