import { Type, Any, File, Visitor } from "../common";

const InitializeCompilerAndInterpreter = function (
  compiler: Any,
  interpreter: Any,
  config: Any
) {
  return [
    {
      name: "InitializeCompilerAndInterpreter",
      definition: {
        compiler: (): Any => new Visitor(compiler, config),
        interpreter: (): Any => new Visitor(interpreter, config),
      },
    },
  ];
};

export { InitializeCompilerAndInterpreter };
