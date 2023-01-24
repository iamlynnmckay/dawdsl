import { Any } from "../common/Any";

import { ExecuteClientServerOrApplication } from "./ExecuteClientServerOrApplication";
import { ExecuteTest } from "./ExecuteTestCase";
import { FindAndInitializeTestCase } from "./FindAndInitializeTestCase";
import { InitializeProgram } from "./InitializeProgram";
import { InitializeClientAndServer } from "./InitializeClientAndServer";
import { InitializeCompilerAndInterpreter } from "./InitializeCompilerAndInterpreter";

const Framework = function (compiler: Any, interpreter: Any, config: Any) {
  return [
    ExecuteClientServerOrApplication,
    ExecuteTest,
    FindAndInitializeTestCase,
    InitializeClientAndServer,
    InitializeCompilerAndInterpreter(compiler, interpreter, config),
    InitializeProgram,
  ].flat();
};

export { Framework };
