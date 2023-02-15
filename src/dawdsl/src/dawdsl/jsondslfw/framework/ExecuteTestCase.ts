import assert from "assert";
import { Any, File, TypeOf } from "../../stdjs";
import { Specification } from "../application";
const ExecuteTest: Specification = [
  {
    key: "ExecuteTestCase",
    before: [
      "FindAndInitializeTestCase",
      "InitializeCompilerAndInterpreter",
      "InitializeProgram",
    ],
    after: [],
    value: {
      test: (_1: Any, v: Any, o: Any) => {
        if (TypeOf.Undefined(v)) return;
        o.program = {
          program: o.interpreter({
            program: o.compiler({ program: o.program }).program,
          }).program,
        };
        File.writeSync(v.actual, JSON.stringify(o.program));
        v.actual = o.program;
        assert.deepEqual(v.actual, v.expected);
        return v;
      },
    },
  },
];

export { ExecuteTest };
