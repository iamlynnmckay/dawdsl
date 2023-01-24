import { Type, Any, File } from "../common";
import * as path from "path";

const FindAndInitializeTestCase = [
  {
    name: "FindAndInitializeTestCase",
    definition: {
      test: {
        expected: (_: Any, v: Any, o: Any) => {
          if (Type.undefined(o.test)) return;
          if (Type.undefined(v)) {
            v = path.parse(o.program).name + ".expected.json";
          }
          if (Type.string(v)) {
            v = JSON.parse(File.readSync(v));
          }
          return v;
        },
        actual: (_: Any, v: Any, o: Any) => {
          if (Type.undefined(o.test)) return;
          if (Type.undefined(v)) {
            v = path.parse(o.program).name + ".actual.json";
          }
          return v;
        },
      },
    },
  },
];

export { FindAndInitializeTestCase };
