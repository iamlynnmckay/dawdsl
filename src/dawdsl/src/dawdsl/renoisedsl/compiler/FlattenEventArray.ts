import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";

const FlattenEventArray: Specification = [
  {
    key: "FlattenEventArray",
    before: ["ExpandEventArrays"],
    after: [],
    value: {
      program: (_1: Any, v: Any, _3: Any) => {
        if (!v.events || v.events.size() == 0) return v;
        while (TypeOf.Array(v.events[0])) {
          v.events = v.events.flatten();
        }
        return v;
      },
    },
  },
];

export { FlattenEventArray };
