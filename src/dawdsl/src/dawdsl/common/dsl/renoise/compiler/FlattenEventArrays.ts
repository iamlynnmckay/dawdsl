import { Specification } from "../../../framework";
import { Any, TypeOf } from "../../../std";

const FlattenEventArrays: Specification = [
  {
    key: "FlattenEventArrays",
    before: ["ExpandEventPropertyArrays"],
    after: [],
    value: {
      program: (_1: Any, v: Any, _3: Any) => {
        if (!v.events || v.events.length == 0) return v;
        while (TypeOf.Array(v.events[0])) {
          v.events = v.events.flat();
        }
        return v;
      },
    },
  },
];

export { FlattenEventArrays };
