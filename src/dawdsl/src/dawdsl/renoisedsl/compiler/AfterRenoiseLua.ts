import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";
import { Renoise } from "../renoise/Renoise";

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
