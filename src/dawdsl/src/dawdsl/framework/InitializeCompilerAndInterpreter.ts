import { Type, Any, File, Visitor } from "../common";
import { Any, Is } from "../common";
import { evaluate } from "../common/Evaluate";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const InitializeCompilerAndInterpreter = function (
  compiler: Any,
  interpreter: Any
): DirectedAcyclicGraph<Specification.Value> {
  return [
    {
      key: "InitializeCompilerAndInterpreter",
      before: [],
      after: [],
      value: {
        compiler: (): Any => evaluate(compiler),
        interpreter: (): Any => evaluate(interpreter),
      },
    },
  ];
};

export { InitializeCompilerAndInterpreter };
