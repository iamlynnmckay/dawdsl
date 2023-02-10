import { SpawnOptions } from "child_process";
import { Any, Is, File } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Program, Property, Specification, Value } from "../common/Type";

const InitializeProgram: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "InitializeProgram",
    before: ["FindAndInitializeTestCase"],
    after: [],
    value: {
      program: (_1: Property[], v: Program.Value, _2: Program.Value) =>
        Is.String(v) ? JSON.parse(File.readSync(v)) : v,
    },
  },
];

export { InitializeProgram };
