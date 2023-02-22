import { Specification } from "./type";
import { Any } from "../std";
import { Evaluator } from "./detail";
import { LibraryModule } from "./modules";

export function Library(compiler: Specification, interpreter: Specification) {
  return (argument: Any) =>
    Evaluator.evaluate(LibraryModule(compiler, interpreter))(argument);
}
