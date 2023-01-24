import assert from "assert"
import {Type, Any, File, Client, Server} from "../common"

const ExecuteTest = [
    {
        name: 'ExecuteTest',
        dependsOn: [
            'FindAndParseTestFiles', 
            'InitializeCompilerAndInterpreter', 
            'InitializeProgram'
        ],
        definition: {
                    test: (_1: Any, v: Any, o: Any) => {
                        const actual = o.interpreter.visit(o.compiler.visit(o.program))
                        File.writeSync(v.actual, JSON.stringify(actual))
                        v.actual = actual
                        assert.deepEqual(v.expected, v.actual)
                    }
        }
    },
]

export {ExecuteTest}