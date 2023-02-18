import { Any } from "../../stdjs";
import { Specification } from "../../jsondslfw";

const TranslateSyntacticSugar: Specification = [
  {
    key: "TranslateSyntacticSugar",
    before: [],
    after: [],
    value: {
      program: (_1: Any, v: Any, _2: Any) => {
        // @TODO
        return v;
      },
    },
  },
];

export { TranslateSyntacticSugar };
