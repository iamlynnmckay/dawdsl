import { Any } from "../../stdjs";
import { Specification } from "../../jsondslfw";

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
