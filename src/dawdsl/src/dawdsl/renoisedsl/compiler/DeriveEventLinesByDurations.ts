import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";

// @TODO: implement this
const DeriveEventLinesByDurations: Specification = [
  {
    key: "DeriveEventLinesByDurations",
    before: [],
    after: [],
    value: {
      program: {
        patterns: (_1: Any, v: Any, _2: Any) => {
          return v;
        },
        events: (_1: Any, v: Any, _2: Any) => {
          return v;
        },
      },
    },
  },
];

export { DeriveEventLinesByDurations };
