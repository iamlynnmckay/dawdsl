import * as path from "path";
import { Any, Is, File } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const FindAndInitializeTestCase: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "FindAndInitializeTestCase",
    before: [],
    after: [],
    value: {
      test: {
        expected: (_: Any, v: Any, o: Any) => {
          if (Is.Undefined(o.test)) return;
          if (Is.Undefined(v)) {
            v = path.parse(o.program).key + ".expected.json";
          }
          if (Is.String(v)) {
            v = JSON.parse(File.readSync(v));
          }
          return v;
        },
        actual: (_: Any, v: Any, o: Any) => {
          if (Is.Undefined(o.test)) return;
          if (Is.Undefined(v)) {
            v = path.parse(o.program).key + ".actual.json";
          }
          return v;
        },
      },
    },
  },
];

export { FindAndInitializeTestCase };
