import { Framework } from "../framework";
import { Any } from "../common";
import { evaluate } from "../common/Evaluate";
import { execute } from "../common/Execute";
import { Interpreter } from "../interpreter";
import { Compiler } from "../compiler";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Program, Specification } from "../common/Type";

export class Application {
  #framework: DirectedAcyclicGraph<Specification.Value>;
  constructor(
    compiler: DirectedAcyclicGraph<Specification.Value>,
    interpreter: DirectedAcyclicGraph<Specification.Value>
  ) {
    this.#framework = Framework(compiler, interpreter);
  }
  run(argument: Any): Value {
    return execute(evaluate(this.#framework), argument);
  }
}
