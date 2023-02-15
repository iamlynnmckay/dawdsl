import { Any } from "../../stdjs";
import { Evaluator } from "./Evaluator";
import { Executor } from "./Executor";
import { Specification, Value } from "./Type";

type Framework = (
  compiler: Specification,
  interpreter: Specification
) => Specification;
export class Application {
  #application: Specification;
  constructor(
    framework: Framework,
    compiler: Specification,
    interpreter: Specification
  ) {
    this.#application = framework(compiler, interpreter);
  }
  run(argument: Any): Value {
    return Executor.execute(Evaluator.evaluate(this.#application), argument);
  }
}
