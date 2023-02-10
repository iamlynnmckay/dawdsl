import { Any, Is } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Program, Specification } from "../common/Type";

const NonEmptyDefaults: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "NonEmptyDefaults",
    before: [],
    after: [],
    value: {
      transport: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? {} : v),
      instruments: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? [] : v),
      tracks: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? [] : v),
      patterns: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? [] : v),
      events: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? [] : v),
    },
  },
];

export { NonEmptyDefaults };
