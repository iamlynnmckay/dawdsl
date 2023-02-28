import { Specification } from "../../../framework";
import { Any, TypeOf, Visitor } from "../../../std";

const BUILT_IN_FUNCTION: { [_: string]: (...as: Any[]) => Any } = {
  repeat: (count: number, value: Any) => Array(count).fill(value),
  flatten: (value: Any) => (TypeOf.Array(value) ? value.flat() : value),
};

const CallBuiltInFunctions: Specification = [
  {
    key: "CallBuiltInFunctions",
    before: ["TranslateSyntacticSugar"],
    after: [],
    value: {
      program: (_1: Any, v: Any, _2: Any) => {
        // @TODO
        Visitor.deepVisitor(v, (ps: (string | number)[], v: Any, o: Any) => {
          if (TypeOf.Object(v)) {
            const entries = Object.entries(v);
            if (entries.length == 1) {
              const k = entries[0][0];
              if (k.startsWith("$")) {
                return BUILT_IN_FUNCTION[k.substring(1)](...entries[0][1]);
              }
            }
          }
          return v;
        });
        return v;
      },
    },
  },
];

export { CallBuiltInFunctions };
