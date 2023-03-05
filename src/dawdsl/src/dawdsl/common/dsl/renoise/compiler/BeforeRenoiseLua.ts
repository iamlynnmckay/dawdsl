import { Specification } from "../../../framework";
import { Any } from "../../../std";

const BeforeRenoiseLua: Specification = [
  {
    key: "BeforeRenoiseLua",
    before: ["FlattenEventArrays"],
    after: [],
    value: {
      lua: (_1: Any, v: Any, o: Any) => {
        return [];
      },
      program: (_1: Any, v: Any, o: Any) => {
        o.lua = [];
        return v;
      },
    },
  },
];

export { BeforeRenoiseLua };
