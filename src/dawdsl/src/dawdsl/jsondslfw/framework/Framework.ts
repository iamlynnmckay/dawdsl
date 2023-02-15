import { Specification } from "../application";
import { ExecuteClientServerOrApplication } from "./ExecuteClientServerOrApplication";
import { ExecuteTest } from "./ExecuteTestCase";
import { FindAndInitializeTestCase } from "./FindAndInitializeTestCase";
import { InitializeClientAndServer } from "./InitializeClientAndServer";
import { InitializeCompilerAndInterpreter } from "./InitializeCompilerAndInterpreter";
import { InitializeProgram } from "./InitializeProgram";

const Framework = function (
  compiler: Specification,
  interpreter: Specification
): Specification {
  return [
    ExecuteClientServerOrApplication,
    ExecuteTest,
    FindAndInitializeTestCase,
    InitializeClientAndServer,
    InitializeCompilerAndInterpreter(compiler, interpreter),
    InitializeProgram,
  ].flat();
};

export { Framework };
