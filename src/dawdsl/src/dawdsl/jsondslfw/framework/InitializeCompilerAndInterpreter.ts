import { Specification, Evaluator } from "../application";
import { Any } from "../../stdjs";

const InitializeCompilerAndInterpreter = function (
  compiler: Specification,
  interpreter: Specification
): Specification {
  return [
    {
      key: "InitializeCompilerAndInterpreter",
      before: [],
      after: [],
      value: {
        compiler: (): Any => Evaluator.evaluate(compiler),
        interpreter: (): Any => Evaluator.evaluate(interpreter),
      },
    },
  ];
};

export { InitializeCompilerAndInterpreter };
