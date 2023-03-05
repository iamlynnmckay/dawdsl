import { Specification } from "../../../framework";
import { Any } from "../../../std";

const ParseDuration: Specification = [
  {
    key: "ParseDuration",
    before: [],
    after: [],
    value: {
      program: (_1: Any, v: Any, _2: Any) => {
        return v;
      },
    },
  },
];

export { ParseDuration };
