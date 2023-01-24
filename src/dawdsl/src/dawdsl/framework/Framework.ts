import { Any } from "../common/Any"

import { ExecuteClientServerOrApplication } from "./ExecuteClientServerOrApplication";
import { ExecuteTest } from "./ExecuteTest";
import { FindAndParseTestFiles } from "./FindAndParseTestFiles"
import { InitializeProgram } from "./InitializeProgram";
import { InitializeClientAndServer } from "./InitializeClientAndServer";
import { InitializeCompilerAndInterpreter } from "./InitializeCompilerAndInterpreter";

const Framework = function(compiler: Any, interpreter: Any, config: Any) {
    return [
        ExecuteClientServerOrApplication,
        ExecuteTest,
        FindAndParseTestFiles,
        InitializeClientAndServer,
        InitializeCompilerAndInterpreter(compiler, interpreter, config),
        InitializeProgram
    ].flat()
}

export {Framework}
