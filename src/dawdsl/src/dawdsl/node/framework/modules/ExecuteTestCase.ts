import assert from "assert";
import { Specification } from "../../../common/framework";
import { Any, TypeOf, File } from "../../std";

const ExecuteTest: Specification = [
  {
    key: "ExecuteTestCase",
    before: ["FindAndInitializeTestCase", "LibraryModule", "InitializeProgram"],
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
