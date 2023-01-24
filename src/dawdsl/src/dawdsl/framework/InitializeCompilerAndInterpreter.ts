import { Type, Any, File, Visitor} from "../common"

const InitializeCompilerAndInterpreter = function (compiler: Any, interpreter: Any, config: Any) {
    return [
        {
            name: 'IntializeCompilerAndInterpreter',
            definition: {
                compiler: (): Any => {
                    return new Visitor(compiler, config).visit
                },
                interpreter: (): Any => {
                    return new Visitor(interpreter, config).visit
                },
            }
        },
    ]
}

export { InitializeCompilerAndInterpreter }