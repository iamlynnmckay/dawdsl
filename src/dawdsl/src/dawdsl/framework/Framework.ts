import { Any } from "../common/Any";

import { ExecuteClientServerOrApplication } from "./ExecuteClientServerOrApplication";
import { ExecuteTest } from "./ExecuteTestCase";
import { FindAndInitializeTestCase } from "./FindAndInitializeTestCase";
import { InitializeProgram } from "./InitializeProgram";
import { InitializeClientAndServer } from "./InitializeClientAndServer";
import { InitializeCompilerAndInterpreter } from "./InitializeCompilerAndInterpreter";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";

const Framework = function (
  compiler: Any,
  interpreter: Any
): DirectedAcyclicGraph<Specification.Value> {
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
