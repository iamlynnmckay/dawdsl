import { Compiler, Interpreter } from "../dsl/renoise";
import { Framework, Application as _Application } from "../framework";

export function Application(language: string) {
  return Framework(
    {
      renoise: {
        compiler: Compiler,
        interpreter: Interpreter,
      },
    },
    _Application
  )(language);
}
