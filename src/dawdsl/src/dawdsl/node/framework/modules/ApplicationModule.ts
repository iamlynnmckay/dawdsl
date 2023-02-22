import { Specification } from "../../../common/framework";
import { LibraryModule } from "../../../common/framework/modules";
import { ExecuteClientServerOrApplication } from "./ExecuteClientServerOrApplication";
import { ExecuteTest } from "./ExecuteTestCase";
import { FindAndInitializeTestCase } from "./FindAndInitializeTestCase";
import { InitializeClientAndServer } from "./InitializeClientAndServer";
import { InitializeProgram } from "./InitializeProgram";

const ApplicationModule = function (
  compiler: Specification,
  interpreter: Specification
): Specification {
  return [
    ExecuteClientServerOrApplication,
    ExecuteTest,
    FindAndInitializeTestCase,
    InitializeClientAndServer,
    LibraryModule(compiler, interpreter),
    InitializeProgram,
  ].flat();
};

export { ApplicationModule };
