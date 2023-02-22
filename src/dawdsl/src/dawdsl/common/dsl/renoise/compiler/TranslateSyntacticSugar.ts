import { Specification } from "../../../framework";
import { Any } from "../../../std";

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
