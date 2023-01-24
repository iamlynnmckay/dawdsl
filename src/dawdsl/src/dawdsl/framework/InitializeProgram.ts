import {Type, Any, File} from "../common"

const InitializeProgram = [
    {
        name: 'InitializeProgram',
        definition: {
            program: (_1: Any, v: Any, _2: Any) => Type.string(v) ? JSON.parse(File.readSync(v)) : v
        }
    },
]

export {InitializeProgram}
