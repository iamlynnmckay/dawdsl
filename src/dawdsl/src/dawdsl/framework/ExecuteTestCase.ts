import assert from "assert";
import { Any, Is, File } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const ExecuteTest: DirectedAcyclicGraph<Specification.Value> = [
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
        if (Is.Undefined(v)) return;
        console.log("here");
        const actual = o.interpreter.visit(o.compiler.visit(o.program));
        File.writeSync(v.actual, JSON.stringify(actual));
        v.actual = actual;
        assert.deepEqual(v.expected, v.actual);
        return v;
      },
    },
  },
];

export { ExecuteTest };
