import { Any } from "../../std";
import { Evaluator } from "../detail";
import { Specification } from "../type";

const LibraryModule = function (
  compiler: Specification,
  interpreter: Specification
): Specification {
  return [
    {
      key: "LibraryModule",
      before: [],
      after: [],
      value: {
        compiler: (): Any => Evaluator.evaluate(compiler),
        interpreter: (): Any => Evaluator.evaluate(interpreter),
      },
    },
  ].flat();
};

export { LibraryModule };
