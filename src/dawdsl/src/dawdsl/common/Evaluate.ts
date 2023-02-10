import { asArray, DirectedAcyclicGraph } from "./Graph";
import { deepQuery } from "./Query";
import { Program, Specification, Value } from "./Type";

export function evaluate(
  modules: DirectedAcyclicGraph<Specification.Value>
): (program: Program.Value) => Program.Value {
  return (program: Program.Value) =>
    asArray(modules).map((module: Specification.Value) =>
      deepQuery(module, program)
    );
}
