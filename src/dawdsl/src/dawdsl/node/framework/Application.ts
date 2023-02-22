import { Specification } from "../../common/framework";
import { Any } from "../std";
import { Evaluator, Executor } from "./detail";
import { ApplicationModule } from "./modules";

export function Application(
  compiler: Specification,
  interpreter: Specification
) {
  return (argument: Any) =>
    Executor.execute(
      Evaluator.evaluate(ApplicationModule(compiler, interpreter)),
      argument
    );
}
