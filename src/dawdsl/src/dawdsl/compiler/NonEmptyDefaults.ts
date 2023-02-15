import { Any, TypeOf } from "../std";
import { Specification } from "../application";

const NonEmptyDefaults: Specification = [
  {
    key: "NonEmptyDefaults",
    before: [],
    after: [],
    value: {
      program: (_1: Any, v: Any, _2: Any) => {
        v.transport = v.transport || {};
        v.instruments = v.instruments || [];
        v.tracks = v.tracks || [{}];
        v.patterns = v.patterns || [{}];
        v.events = v.events || [];
        return v;
      },
    },
  },
];

export { NonEmptyDefaults };
