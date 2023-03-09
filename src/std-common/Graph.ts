type Key = string;

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
type TotallyOrderedArray<Value> = Array<[Key, Value]>;

function asTotallyOrderedArray<Value>(
  a: PartiallyOrderedSinglyLinkedMap<Value>
): TotallyOrderedArray<Value> {
  const depthFirstSearch = function (
    graph: PartiallyOrderedSinglyLinkedMap<Value>
  ): Array<Key> {
    const f = (current: Key, visited: Set<Key>, stack: Array<Key>) => {
      if (visited.has(current)) return;
      visited.add(current);
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
    return stack.reverse();
  };
  return depthFirstSearch(a).map((k) => {
    return [k, a[k].value];
  });
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
    ([_, element]: [string, PartiallyOrderedDoublyLinkedMapElement<Value>]) => {
      element.before.forEach((before: Key) => b[before].after.push(before));
    }
  );
  return b;
}

export type DirectedAcyclicGraph<Value> =
  PartiallyOrderedDoublyLinkedList<Value>;

export class Graph {
  static asArray<Value>(
    graph: DirectedAcyclicGraph<Value>
  ): Array<[Key, Value]> {
    const a = asPartiallyOrderedDoublyLinkedMap(graph);
    const b = asPartiallyOrderedSinglyLinkedMap(a);
    const c = asTotallyOrderedArray(b);
    return c;
  }
}
