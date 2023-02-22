import { Specification } from "../../../framework";
import { Any } from "../../../std";

const NonEmptyDefaults: Specification = [
  {
    key: "NonEmptyDefaults",
    before: ["CallBuiltInFunctions"],
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
