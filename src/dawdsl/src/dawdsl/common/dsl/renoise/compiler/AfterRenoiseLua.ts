import { Specification } from "../../../framework";
import { Any } from "../../../std";

const AfterRenoiseLua: Specification = [
  {
    key: "AfterRenoiseLua",
    before: ["RenoiseLua"],
    after: [],
    value: {
      program: (_1: Any, v: Any, o: Any) => {
        return o.lua;
      },
    },
  },
];

export { AfterRenoiseLua };
