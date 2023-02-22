import { Compiler, Interpreter } from "../dsl/renoise";
import { Framework, Library as _Library } from "../framework";
import { Any } from "../std";

export function Library(language: string): (argument: Any) => Any {
  const framework = Framework(
    {
      renoise: {
        compiler: Compiler,
        interpreter: Interpreter,
      },
    },
    _Library
  )(language)({});
  return (argument: Any) => framework.interpreter(framework.compiler(argument));
}
