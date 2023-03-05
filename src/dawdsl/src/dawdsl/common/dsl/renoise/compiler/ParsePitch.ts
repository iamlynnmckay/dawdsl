import { Specification } from "../../../framework";
import { Any } from "../../../std";

const ParsePitch: Specification = [
  {
    key: "ParsePitch",
    before: [],
    after: [],
    value: {
      program: (_1: Any, v: Any, _2: Any) => {
        return v;
      },
    },
  },
];

export { ParsePitch };
