import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";
import { Renoise } from "../renoise/Renoise";

const ExpandEventPropertyArrays: Specification = [
  {
    key: "ExpandEventPropertyArrays",
    before: [],
    after: [],
    value: {
      program: {
        events: (_1: Any, v: Any, _3: Any) => {
          // get maximum length of property arrays as size
          let size = 1;
          Object.entries(v).map(([k, x]: [string, Any]) => {
            if (TypeOf.Array(x)) {
              size = Math.max(size, x.length);
            }
          });
          // expand property arrays to new events
          return Array(size)
            .fill({})
            .map((y, i) => {
              const z: { [_: string]: Any } = {};
              Object.entries(v).map(([k, x]: [string, Any]) => {
                if (TypeOf.Array(x)) {
                  z[k] = x[i % x.length];
                } else {
                  z[k] = x;
                }
              });
              return z;
            });
        },
      },
    },
  },
];

export { ExpandEventPropertyArrays };
