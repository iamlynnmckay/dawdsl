import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";

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
