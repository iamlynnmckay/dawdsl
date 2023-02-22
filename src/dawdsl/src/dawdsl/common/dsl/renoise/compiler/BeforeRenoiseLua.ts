import { Specification } from "../../../framework";
import { Any } from "../../../std";

const BeforeRenoiseLua: Specification = [
  {
    key: "BeforeRenoiseLua",
    before: ["ParsePitch", "ParseDuration"],
    after: [],
    value: {
      program: (_1: Any, v: Any, o: Any) => {
        o.lua = [];
        return v;
      },
    },
  },
];

export { BeforeRenoiseLua };
