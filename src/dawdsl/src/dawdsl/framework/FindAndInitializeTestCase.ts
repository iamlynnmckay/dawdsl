import * as path from "path";
import { Any, TypeOf, File } from "../std";
import { Value } from "../application";
import { Specification } from "../application";
const FindAndInitializeTestCase: Specification = [
  {
    key: "FindAndInitializeTestCase",
    before: [],
    after: [],
    value: {
      test: {
        expected: (_1: (string | number)[], v: Value, _2: Value) =>
          TypeOf.String(v) ? JSON.parse(File.readSync(v)) : v,
        actual: (_: Any, v: Any, o: Any) => {
          return v;
        },
      },
    },
  },
];

export { FindAndInitializeTestCase };
